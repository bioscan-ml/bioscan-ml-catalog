---
name: huggingface
description: Manage HuggingFace Hub resources (models, datasets) via CLI and Python. Use when working with HuggingFace PRs, discussions, repo metadata, or README descriptions. Key insight: the `hf` CLI does NOT support PR management—use the `huggingface_hub` Python library instead.
---

# HuggingFace Hub Management

## Key Constraint

The `hf` CLI supports auth, upload, download, and repo operations,
but **not** PR/discussion management.
For PRs, use `huggingface_hub` Python library via `uv run`.

## Authentication

```bash
# Interactive login (run in separate terminal if in Claude Code)
uvx --from huggingface_hub hf auth login

# Verify
uvx --from huggingface_hub hf auth whoami
```

## PR Operations (Python)

Use heredoc pattern with `uv run`:

### Create PR with description

```bash
uv run --with huggingface_hub python3 << 'PYEOF'
from huggingface_hub import HfApi, CommitOperationAdd

api = HfApi()
result = api.create_commit(
    repo_id='org/repo',
    repo_type='model',  # or 'dataset'
    operations=[CommitOperationAdd(path_in_repo='README.md', path_or_fileobj=content.encode())],
    commit_message='Fix typo',
    commit_description='@reviewer Please review.\n\n**Changes:**\n- Fixed typo',  # This becomes PR description
    create_pr=True,
)
print(f'PR URL: {result.pr_url}')
PYEOF
```

**Important**: Use `commit_description` for PR body—do not add a separate comment.

### Push to existing PR branch

```bash
api.upload_file(
    path_or_fileobj=content.encode(),
    path_in_repo='README.md',
    repo_id='org/repo',
    repo_type='model',
    revision='refs/pr/3',  # PR branch
    commit_message='Update'
)
```

### Merge PR

```bash
api.merge_pull_request(
    repo_id='org/repo',
    repo_type='model',
    discussion_num=3,
    comment='Thanks!'
)
```

### Close PR

```bash
api.change_discussion_status(
    repo_id='org/repo',
    repo_type='model',
    discussion_num=3,
    new_status='closed',
    comment='Closing—explanation above.'
)
```

### Edit PR description

```bash
from huggingface_hub import get_discussion_details

details = get_discussion_details('org/repo', discussion_num=3, repo_type='model')
api.edit_discussion_comment(
    repo_id='org/repo',
    repo_type='model',
    discussion_num=3,
    comment_id=details.events[0].id,  # First event is PR description
    new_content='Updated description'
)
```

### List open PRs

```bash
from huggingface_hub import get_repo_discussions

for d in get_repo_discussions('org/repo', repo_type='model', discussion_status='open'):
    print(f'#{d.num}: {d.title} (PR: {d.is_pull_request})')
```

## Repo Type

Always specify `repo_type`:
- `model` — model repos
- `dataset` — dataset repos
- `space` — Spaces
