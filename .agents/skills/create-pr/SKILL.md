---
name: create-pr
description: Create a clear, reviewable pull request with a concise title and useful description. Use when the user asks to create, open, draft, or prepare a PR.
---

# Create PR

## Workflow

1. Determine branch state:
   - Check the current branch and base branch first.
   - If the current branch is `main`/`master`, prepare a new semantic branch, commit the intended changes, push it, and create the PR.
   - If the current branch is not `main`/`master`, check whether a PR already exists for it before creating one.

2. Prepare or update the PR:
   - Ensure intended changes are committed.
   - Verify the branch is up to date with its base branch.
   - Push the branch to the remote if needed.
   - If a PR already exists, update its title/body instead of creating a duplicate.
   - Use a descriptive title that summarizes the user-facing or reviewer-facing outcome.
   - Prefer `gh pr create` when available.
   - Do not push or create a PR unless the user explicitly asked for it.

3. Write the PR body from the full branch:
   - Summarize all changes since the branch diverged from the base branch.
   - Review the branch diff and relevant commits; do not base the description only on the latest commit.
   - Include committed changes and any intended changes committed as part of preparing the PR.

```markdown
[What and why in one or two sentences.]

## Changes
- [Key change 1]
- [Key change 2]
```

Keep the description focused on why the change exists and what reviewers should pay attention to.
