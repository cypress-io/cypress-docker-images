## Overview

Rules for reviewing pull requests in `cypress-docker-images`. Most changes land in [factory/.env](../factory/.env), which pins the versions baked into the published `cypress/factory`, `cypress/base`, `cypress/browsers`, and `cypress/included` images. [CONTRIBUTING.md](../CONTRIBUTING.md) is the source of truth for how those versions are maintained.

## Cypress release bumps must refresh browsers

A Cypress release bump republishes `cypress/browsers` and `cypress/included`, so it is also the moment those images pick up current browsers. Established practice is one PR that updates `CYPRESS_VERSION` **and** refreshes every browser pin to its latest stable version. The Cypress monorepo's release guide only mentions `CYPRESS_VERSION`, and a PR that followed it literally left the images a full major behind on every browser ([#1610](https://github.com/cypress-io/cypress-docker-images/issues/1610)).

When a PR targeting `master` changes `CYPRESS_VERSION` in `factory/.env`:

- [ ] **Browser pins checked**: `CHROME_VERSION`, `CHROME_FOR_TESTING_VERSION`, `EDGE_VERSION`, and `FIREFOX_VERSION` are updated in the same PR. If any of them is unchanged, flag it as a bug unless the PR description says that version was checked and is already the latest stable.
- [ ] **Firefox especially**: Firefox ships a new major every 2 weeks, so an unchanged `FIREFOX_VERSION` is likely stale. Call it out by name.
- [ ] **Geckodriver considered**: `GECKODRIVER_VERSION` changes only when a newer release exists. Leaving it unchanged is fine.

Do not flag a difference between `CHROME_VERSION` and `CHROME_FOR_TESTING_VERSION`. They come from different sources that publish on their own schedules, so the latest stable of each often differs, sometimes by a major version.

This rule does not apply to alternate-version feature branches (named like `<cypress-version>-node-<node.js version>-publish`), which follow their own process in CONTRIBUTING.md.

When you flag an unchanged browser pin, name each variable and point to the source URL in the comment above it in `factory/.env`, so the author knows exactly where to look.

## Version pin rules

- [ ] **No FACTORY_VERSION bump for version-only changes**: Changing browser versions, `GECKODRIVER_VERSION`, or `CYPRESS_VERSION` must not bump `FACTORY_VERSION` or add a factory CHANGELOG entry. Those are reserved for changes to `BASE_IMAGE`, `FACTORY_DEFAULT_NODE_VERSION`, `YARN_VERSION`, `factory.Dockerfile`, or `installScripts`.
- [ ] **FACTORY_VERSION bump when required**: Conversely, a change to any of those factory inputs must bump `FACTORY_VERSION` and add an entry to the factory CHANGELOG.
- [ ] **Downgrades explained**: `factory/.env` on `master` holds the latest stable versions, so a PR that lowers any version pin should say why (for example, rolling back a broken browser release). Flag a downgrade with no stated reason.
- [ ] **Platform notes respected**: Each pin's comment lists which platforms it supports (for example, Edge is Linux/amd64 only). Flag changes that contradict those notes.
