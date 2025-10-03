from __future__ import annotations
from dataclasses import dataclass
import unicodedata
from rapidfuzz.distance import Levenshtein
from rapidfuzz import fuzz
from difflib import SequenceMatcher

@dataclass(frozen=True)
class MatchResult:
    start: int         # raw haystack start (inclusive)
    end:   int         # raw haystack end (exclusive)
    dist:  int         # distance on the *normalised* text
    ratio: float       # similarity 0..100 on normalised text
    nstart: int        # start in normalised haystack
    nend:   int        # end in normalised haystack

def _normalize(
    s: str,
    *,
    ignore_case: bool,
    squish_ws: bool,
    unify_unicode: bool
) -> str:
    if unify_unicode:
        s = unicodedata.normalize("NFC", s)
    if ignore_case:
        s = s.casefold()
    if squish_ws:
        s = " ".join(s.split())
    return s

def locate_substring(
    haystack: str,
    needle: str,
    *,
    max_extra: int | None = None,
    max_dist: int | None = None,
    min_ratio: float | None = None,
    ignore_case: bool   = True,
    squish_ws: bool     = True,
    unify_unicode: bool = True,
) -> MatchResult | None:
    if not needle:
        return MatchResult(0, 0, 0, 100.0, 0, 0)

    # Fast path if we aren't normalising destructively
    if not (ignore_case or squish_ws or unify_unicode):
        hit = haystack.find(needle)
        if hit != -1:
            return MatchResult(hit, hit + len(needle), 0, 100.0, hit, hit + len(needle))

    hs = _normalize(haystack, ignore_case=ignore_case,
                                squish_ws=squish_ws,
                                unify_unicode=unify_unicode)
    nd = _normalize(needle,   ignore_case=ignore_case,
                                squish_ws=squish_ws,
                                unify_unicode=unify_unicode)

    L = len(nd)
    if L == 0:
        return MatchResult(0, 0, 0, 100.0, 0, 0)

    if max_extra is None:
        max_extra = max(3, L // 5)
    N = len(hs)

    # 1) Rough anchor using difflib (cheap & deterministic)
    sm = SequenceMatcher(None, hs, nd)
    # Longest common block
    blk = sm.find_longest_match(0, len(hs), 0, len(nd))
    rough_start = blk.a

    # 2) Local refinement
    best = None
    for offset in range(max(0, rough_start - max_extra),
                        min(N, rough_start + max_extra + 1)):
        min_win = max(1, L - 3)
        max_win = min(L + max_extra, N - offset)
        for win_len in range(min_win, max_win + 1):
            end = offset + win_len
            sub = hs[offset:end]
            dist  = Levenshtein.distance(nd, sub)
            ratio = fuzz.ratio(nd, sub)
            if max_dist is not None and dist > max_dist:
                continue
            if min_ratio is not None and ratio < min_ratio:
                continue
            if best is None or dist < best.dist or (dist == best.dist and ratio > best.ratio):
                best = MatchResult(
                    start=-1, end=-1,
                    dist=dist, ratio=ratio,
                    nstart=offset, nend=end
                )
                if dist == 0 and ratio == 100.0:
                    break
        if best and best.dist == 0:
            break

    if not best:
        return None

    # 3) Map back to raw haystack
    #    Heuristic: search the raw window for the needle (casefolded) prefix
    #    If not found, fallback to direct span mapping (may be slightly off when squishing ws)
    window_lo = max(0, best.nstart - 2 * max_extra)
    window_hi = min(len(haystack), best.nend   + 2 * max_extra)
    raw_chunk = haystack[window_lo:window_hi]
    # use casefold to be consistent with ignore_case
    idx = raw_chunk.casefold().find(needle.casefold() if ignore_case else needle)
    if idx >= 0:
        ts = window_lo + idx
        te = ts + len(needle)
    else:
        # fallback: assume lengths didn't change too much
        ts, te = best.nstart, best.nend
        ts = max(0, min(len(haystack), ts))
        te = max(ts, min(len(haystack), te))

    return MatchResult(ts, te, best.dist, best.ratio, best.nstart, best.nend)



def locate_substring_fast(
    haystack: str,
    needle: str,
    *,
    max_extra: int | None = None,
    max_dist: int | None  = None,
    min_ratio: float | None = None,
    ignore_case: bool   = True,
    squish_ws: bool     = True,
    unify_unicode: bool = True,
) -> MatchResult | None:
    # 1) Quick exact‐match path
    if not (ignore_case or squish_ws or unify_unicode):
        idx = haystack.find(needle)
        if idx != -1:
            return MatchResult(idx, idx+len(needle), 0, 100.0, idx, idx+len(needle))

    # 2) Normalize once
    hs = _normalize(haystack, ignore_case=ignore_case, squish_ws=squish_ws, unify_unicode=unify_unicode)
    nd = _normalize(needle,   ignore_case=ignore_case, squish_ws=squish_ws, unify_unicode=unify_unicode)
    L = len(nd)
    if L == 0:
        return MatchResult(0, 0, 0, 100.0, 0, 0)

    # 3) Set sane defaults
    if max_extra is None:
        max_extra = max(1, L // 5)
    if max_dist is None:
        max_dist = L // 10
    if min_ratio is None:
        min_ratio = 70.0

    # 4) Rough anchor
    sm = SequenceMatcher(None, hs, nd)
    blk = sm.find_longest_match(0, len(hs), 0, L)
    rough_start = blk.a

    # 5) Slide a fixed window of length L
    best: MatchResult | None = None
    lo = max(0, rough_start - max_extra)
    hi = min(len(hs), rough_start + L + max_extra)
    for offset in range(lo, hi - L + 1):
        sub = hs[offset:offset+L]
        ratio = fuzz.ratio(nd, sub)
        if ratio < min_ratio:
            continue
        dist = Levenshtein.distance(nd, sub)
        if dist > max_dist:
            continue
        # pick the best by lowest dist → highest ratio
        if best is None or dist < best.dist or (dist == best.dist and ratio > best.ratio):
            best = MatchResult(-1, -1, dist, ratio, offset, offset+L)
            if dist == 0:
                break

    if not best:
        return None

    # 6) Map back to raw haystack
    window_lo = max(0, best.nstart - max_extra)
    window_hi = min(len(haystack), best.nend   + max_extra)
    raw_chunk = haystack[window_lo:window_hi]
    folded = raw_chunk.casefold() if ignore_case else raw_chunk
    needle_folded = needle.casefold() if ignore_case else needle
    idx = folded.find(needle_folded)
    if idx >= 0:
        ts = window_lo + idx
        te = ts + len(needle)
    else:
        ts, te = best.nstart, best.nend
    return MatchResult(ts, te, best.dist, best.ratio, best.nstart, best.nend)