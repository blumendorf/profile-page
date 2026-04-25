---
name: dependency-update
description: Updates npm, pnpm, Node tooling, and GitHub Actions safely in this repo. Use when the user asks to check, update, upgrade, or modernize packages, dependencies, lockfiles, workflows, actions, ratchet pins, pnpm, Vite, React, TypeScript, ESLint, Playwright, or similar tooling.
---

# Dependency Updates

Use this workflow for npm packages, pnpm, Node-related tooling, and GitHub Actions.

## Security Age Gate

- Only update to a package version or action tag that has been published for at least 3 days.
- Check publish times before editing manifests or workflows.
- If the registry or GitHub `latest` is too new, use the newest eligible previous version instead.
- Do not rely on a broad `latest` install when it could pull a release that is less than 3 days old.

## npm And pnpm Packages

- Use `pnpm outdated --format json` to identify outdated direct dependencies.
- For each target version, verify the npm publish timestamp with `npm view <package>@<version> time --json`.
- Update `package.json` and regenerate `pnpm-lock.yaml` with explicit eligible versions.
- Keep dependency changes scoped to direct dependencies unless transitive lockfile changes are produced by pnpm.
- If updating pnpm itself, choose the newest stable pnpm version that satisfies the 3-day gate and keep workflow setup versions aligned.

## GitHub Actions

GitHub Action versions are pinned to commit SHAs with `ratchet:` comments:

```yaml
uses: owner/action@<sha> # ratchet:owner/action@<tag>
```

- Use the `ratchet` CLI for workflow action pin maintenance.
- Use `ratchet check .github/workflows/*.yml` to verify pin status.
- Use `ratchet update .github/workflows/*.yml` to refresh SHAs for the currently referenced tags.
- Use `ratchet upgrade .github/workflows/*.yml` when moving to newer action tags.
- After upgrading tags, verify each chosen tag is at least 3 days old before keeping it.
- Preserve the repository's SHA-pinned style and keep each `ratchet:` comment in sync with the tag that produced the SHA.

## Validation

- After every dependency or action update, run:
  1. `pnpm lint`
  2. `pnpm test`
  3. `pnpm build`
- Run `pnpm test:e2e` when Playwright, Vite, React, routing, browser-facing dependencies, or global build/runtime behavior changes.
- If Playwright browsers are missing locally, install them with `pnpm exec playwright install --with-deps` before retrying E2E tests.
- For intentional visual changes, run `pnpm test:e2e:update-snapshots`, then review the snapshot diffs before keeping them.
- Do not update snapshots just to make failing tests pass; first confirm the visual diff is expected.
- For GitHub Actions updates, run `ratchet check .github/workflows/*.yml` after changes to verify pins and comments remain valid.
- Fix compatibility issues introduced by major upgrades in the smallest practical scope.
