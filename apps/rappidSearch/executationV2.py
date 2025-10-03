import os
import json
from pathlib import Path
from datetime import datetime, timedelta
from findServiceV2 import locate_substring, MatchResult
from typing import List, Dict, Optional

def parse_timestamp(ts: str) -> datetime:
    # Format: HH:MM:SS:FF (frame/fraction may be ignored)
    parts = ts.split(":")
    if len(parts) >= 3:
        return datetime.strptime(":".join(parts[:3]), "%H:%M:%S")
    raise ValueError(f"Invalid timestamp: {ts}")

def find_closest_index(target_ts: str, refresh_data: list[dict]) -> int:
    target_dt = parse_timestamp(target_ts)
    min_diff = timedelta.max
    closest_idx = -1

    for i, entry in enumerate(refresh_data):
        try:
            current_dt = parse_timestamp(entry["timestamp"])
            diff = abs(current_dt - target_dt)
            if diff < min_diff:
                min_diff = diff
                closest_idx = i
        except Exception:
            continue

    return closest_idx


def build_haystack(entries: List[Dict[str, str]]) -> str:
    """
    Join entry texts into a single haystack string, separated by newlines.
    Returns the combined string and a list of line-start offsets.
    """
    lines = [entry["text"] for entry in entries]
    haystack = "\n".join(lines)
    # Compute starting offset of each line
    offsets = [0]
    for text in lines[:-1]:
        offsets.append(offsets[-1] + len(text) + 1)  # +1 for newline
    return haystack, offsets


def map_char_to_index(offsets: List[int], char_idx: int) -> int:
    """
    Map a character index in haystack to the corresponding line index.
    Falls back to the nearest valid line if no exact match found.
    """
    valid_indices = [i for i, start in enumerate(offsets) if start <= char_idx]
    if not valid_indices:
        # Fallback to first line
        return 0
    return max(valid_indices)


def extract_multiline_entries(
    origin,
    entries: List[Dict[str, str]],
    phrase: str,
    **matcher_kwargs
) -> List[Dict[str, str]]:
    """
    Locate a fuzzy phrase across multiple text entries and return
    each matched slice as separate JSON objects with timestamps.

    Steps:
    1. Build haystack string and offsets.
    2. Use locate_substring() to find precise start/end in haystack.
    3. Determine which entries the match spans.
    4. Slice matched text by lines and map back timestamps.
    """
    haystack, offsets = build_haystack(entries)
    result: List[Dict[str, str]] = []
    #if origin in ('E'):
        #print(f"\nhhhh",entries,haystack)
    # Find fuzzy match
    match: Optional[MatchResult] = locate_substring(haystack, phrase, **matcher_kwargs)
    if not match:
        return result
    start, end = (match.start, len(haystack)) if origin == 'S' else (0, match.end)

    # Map char indices to entry indices
    start_idx = map_char_to_index(offsets, start)
    end_idx = map_char_to_index(offsets, end - 1)
    #print(f"Matched phrase '{phrase}' from {start} to {end} = {haystack[start:end]} in haystack.")
    # Extract matched lines
    matched_text = haystack[start:end]
    lines = matched_text.splitlines()

    # Build output
    for idx, line in zip(range(start_idx, end_idx + 1), lines):
       # print(f"\nExtracted line: {line} with timestamp {entries[idx]['timestamp']}")
        result.append({
            "timestamp": entries[idx]["timestamp"],
            "text": line
        })
    return result


def transfer_annotation_with_difflib(annotation, refresh_data, refresh_number, **matcher_kwargs):
    """
    1) Coarsely locate start/end in refresh_data
    2) Grab a context window around them
    3) Refine start by searching all lines up through the pivot
    4) Refine end by searching all lines from the pivot to the bottom
    5) Slice refresh_data between those refined timestamps
    """
    if not annotation:
        return []
    
    # ——— Helpers —————————————————————————————————————————————————————
    def parse_timestamp(ts: str) -> datetime:
        # HH:MM:SS:FF → FF as hundredths of a second
        h, m, s, ff = [int(x) for x in ts.split(":")]
        base = datetime(1900, 1, 1, h, m, s)
        return base + timedelta(milliseconds=ff * 10)

    def find_closest_index_in_block(ts: str, block: list[dict]) -> int:
        target = parse_timestamp(ts)
        return min(
            range(len(block)),
            key=lambda i: abs(parse_timestamp(block[i]["timestamp"]) - target)
        )

    # ——— 1) Coarse locate ———————————————————————————————————————————
    start_idx = find_closest_index_in_block(annotation[0]["timestamp"], refresh_data)
    end_idx   = find_closest_index_in_block(annotation[-1]["timestamp"], refresh_data)
    if start_idx > end_idx:
        start_idx, end_idx = end_idx, start_idx

    # ——— 2) Grab some context (2 lines before start through 2 after end) ———
    ctx_start = max(0, start_idx - 2)
    ctx_end   = min(len(refresh_data), end_idx + 3)
    final_block = refresh_data[ctx_start:ctx_end]

    # ——— 3) Refine start ——————————————————————————————————————————
    pivot_start = find_closest_index_in_block(annotation[0]["timestamp"], final_block)
    upper_block = final_block[: pivot_start + 1]
    start_matches = extract_multiline_entries(
        "S",
        upper_block,
        annotation[0]["text"],
        **matcher_kwargs
    )
    if start_matches:
        start_time = start_matches[0]["timestamp"]
    else:
        # fallback to the annotation’s own line
        start_time = annotation[0]["timestamp"]
        start_matches = [annotation[0]]
    #print(f"Start matches: {start_matches}")
    # ——— 4) Refine end ————————————————————————————————————————————
    pivot_end = find_closest_index_in_block(annotation[-1]["timestamp"], final_block)
    # Include one line before pivot_end to capture matches that span lines
    lower_block_start = max(0, pivot_end - 1)
    lower_block = final_block[lower_block_start:]

   

    #lower_block = final_block[pivot_end:]
    #print(f"Pivot end index: {pivot_end}",lower_block)
    end_matches = extract_multiline_entries(
        "E",
        lower_block,
        annotation[-1]["text"],
        **matcher_kwargs
    )
    #printj("final block", final_block)
    #printj("lower block", lower_block)
    #print(f"End matches: {end_matches}")
    if end_matches:
        end_time = end_matches[-1]["timestamp"]
    else:
        end_time = annotation[-1]["timestamp"]
        end_matches = [annotation[-1]]

    # ——— 5) Slice the full refresh_data between start_time and end_time ————
    result = [
        line for line in refresh_data
        if start_time <= line["timestamp"] <= end_time
    ]
    if result:
        # override the first/last text with your exact matched slices
        result[0]["text"] = start_matches[0]["text"]
        if len(result) > 1:
            result[-1]["text"] = end_matches[-1]["text"]

    return result



def annotSearch(original_annotation,refresh_data,refresh_number):
    current_annotation = original_annotation
    result = transfer_annotation_with_difflib(current_annotation, refresh_data, refresh_number)
    return result
