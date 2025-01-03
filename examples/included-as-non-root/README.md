# Running cypress/included image as non-root

## Displaying user information

Cypress Docker images `cypress/included` run by default as `root` user. You can check this with the Unix command `whoami`:

```text
$ docker run -it --rm --entrypoint whoami cypress/included
root
```

The Unix command `id` provides some more information about the user:

```text
$ docker run -it --rm --entrypoint id cypress/included
uid=0(root) gid=0(root) groups=0(root)
```

## Run as non-root

The non-root `node` user is available in `cypress/included` Cypress Docker images. You can pass the user `node` as an option when running a Cypress Docker image as a container and this then replaces the default `root` user:

```text
$ docker run -it --rm --entrypoint id -u node cypress/included
uid=1000(node) gid=1000(node) groups=1000(node)
```

To run the example Cypress project with `node` as user, change directory to `examples/included-as-non-root` and execute the following `docker run` command:

```shell
cd examples/included-as-non-root
docker run --rm -v .:/test -w /test -u node cypress/included
```

You can expect this command to run successfully.

## GitHub Actions

In general when running Cypress Docker images in GitHub Actions it is recommended to use the GitHub Actions' `container` syntax (see [Running jobs in a container](https://docs.github.com/en/actions/writing-workflows/choosing-where-your-workflow-runs/running-jobs-in-a-container) and [.github/workflows/example-cypress-github-action.yml](../../.github/workflows/example-cypress-github-action.yml)).

If however Docker is run directly in a GitHub Actions workflow, such as:

```yaml
- run: docker run --rm -v .:/test -w /test -u node cypress/included
  working-directory: examples/included-as-non-root
```

then the `docker` command will be run from GitHub's `runner` user `1001` and the Cypress Docker image `node` user `1000` will have no write access to the `/test` directory. Cypress will warn that the project root directory is read-only and that screenshots and videos cannot be captured.

To enable screenshot and video captures, redirect the folders to a writable folder, such as `/tmp`. See [cypress.config.js](./cypress.config.js) for an example.

Pending resolution of Cypress issue https://github.com/cypress-io/cypress/issues/30810, Cypress will however still produce a warning.
