"""Synthetic source-coordinate fixture; contains no real policy passage."""
from guance_agent.schemas import EvidenceRef


def make_ref(**kw):
    base = dict(
        planid="20699", chunk_id="chunk_c5481643e7c67d653e29160c30719104",
        title="合成证据样例", area="示例市", fyp="演示规划期",
        admin_level="市", plantype_label="演示专项规划",
        section_idx=4, section_path="第四部分 演示任务",
        char_start=10864, char_end=11164,
        chunk_char_start=10864, chunk_char_end=11315,
        section_char_start=8286, section_char_end=19608,
        document_version_id="v1", generation_id="g1", source_hash="h1",
        offset_basis="body_first_non_whitespace", offset_unit="unicode_codepoint",
        source="kb_search",
    )
    return EvidenceRef(**{**base, **kw})
