"""Check the public Git manifest without reading local credentials or runtime data."""
import json
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
BLOCKED_PREFIXES = (
    '原始数据库/', '训练集/', '语料库/', 'project-context/',
    'agent/contracts/rag_samples/', 'agent/reports/',
    'rag库/设计方案2.0/Agent对接说明/samples/',
)
BLOCKED_SUFFIXES = ('.pdf', '.doc', '.docx', '.xlsx', '.csv', '.jsonl', '.sqlite',
                    '.sqlite3', '.db', '.zip', '.pem', '.key', '.p12', '.pfx')


def main():
    names = subprocess.check_output(
        ['git', 'ls-files', '-z'], cwd=ROOT,
    ).decode('utf-8').split('\0')
    names = [name for name in names if name]
    assert names, 'No tracked files to inspect'
    rejected = []
    for name in names:
        path = Path(name)
        if (name.startswith(BLOCKED_PREFIXES) or name.lower().endswith(BLOCKED_SUFFIXES)
                or (path.name.startswith('.env') and path.name != '.env.example')
                or re.search(r'\.part\d+$', name)
                or (path.name == 'sample.json' and '/business/' in name)):
            rejected.append(name)
    assert not rejected, f'Restricted file types or locations: {rejected}'
    topics = json.loads((ROOT / 'web/frontend/src/data/policyTopics.json').read_text('utf-8'))
    assert topics['source'] == 'synthetic-demo'
    assert set(topics['documents']) == {'DEMO-A', 'DEMO-B', 'DEMO-C'}
    mock = json.loads((ROOT / 'agent/mock_data/kb.json').read_text('utf-8-sig'))
    assert all(item['planid'].startswith('TEST-') for item in mock)
    print(f'Public boundary verified: {len(names)} tracked files; synthetic data only in shipped datasets')


if __name__ == '__main__':
    main()
