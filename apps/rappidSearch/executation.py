# ——— Import the core finder ———
from findService import locate_substring, MatchResult

def find_start_edge(
    haystack: str,
    needle: str,
    **kwargs
) -> int | None:
    """
    Returns the exact character index where `needle` begins in `haystack`,
    or None if no acceptable fuzzy match is found.
    """
    m: MatchResult | None = locate_substring(haystack, needle, **kwargs)
    return m.start if m else None

def find_end_edge(
    haystack: str,
    needle: str,
    **kwargs
) -> int | None:
    """
    Returns the exact character index where `needle` ends in `haystack`,
    or None if no acceptable fuzzy match is found.
    """
    m: MatchResult | None = locate_substring(haystack, needle, **kwargs)
    return m.end if m else None


text   = """What this picture shows is that it's not possible
to fimethe value on the vertical axis on the
horizontal, says scrksz sthfs from phase 1 to phase 5.
"""
phrase = "vertical axis on the horizontal,"

text ="going to, in the interests of time, I'm going to skip"
phrase = "in the interests of time, I'm going to skip"


text = """that was a very difficult formation called Wilcox
formation.  The net to gross ratio in that field ^doc)
is even more complicated than D1-D3.
"""
phrase = "that field ^doc) is even more complicated"


text = """What this picture shows is that it's not possible
to fimethe value on the vertical axis on the
horizontal, says scrksz sthfs from phase 1 to phase 5.
"""

phrase = "to fithe value on the vertical axis on the horizontal,"


# text = """85 per cent recovery -- no way.  Technically
# impossible.\"
# So what I have done here is -- and this is what
# AIDP mentions when they use a value of 85 per cent ^^
# they look at the UK publications on oil and gas
# recovery and they list the field with depletion, dry
# """

# phrase = "85 per cent ^^ they look at the UK publications on oil and"


text = """85 per cent recovery -- no way.  Technically
impossible.\"
So what I have done here is -- and this is what
AIDP mentions when they use a value of 85 per cent
they look at the UK publications on oil and gas
recovery and they list the field with depletion, dry"""


phrase = """85 per cent ^^ they look 
at the UK publications on oil and"""




# text = """production in a phased development approach is what we
# need to follow.
# The key fact, features of FDP ^^ will be an"""

# phrase = "key fact, features of FDP ^^ will"

# find the start‑edge:
# idx = find_start_edge(text, phrase, max_extra=10, min_ratio=80)
# if idx is None:
#     print("No good match found")
# else:
#     # slice from that point through the end:
#     tail = text[idx:]
#     print("STAR INDEX",idx)
#     print(tail)

# # same text & phrase…
# idx_end = find_end_edge(text, phrase, max_extra=10, min_ratio=80)
# if idx_end is None:
#     print("No good match found")
# else:
#     # slice from the beginning through that end‑edge:
#     head = text[:idx_end]
#     print("END INDEX",idx_end)
#     print(head)
