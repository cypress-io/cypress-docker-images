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

To run the example Cypress project in the [src](./src/) subdirectory with `node` as user, change directory to `examples/included-as-non-root` and execute the following `docker run` command:

```shell
cd examples/included-as-non-root
docker run -it --rm -v ./src:/test -w /test -u node cypress/included
```

You can expect this command to run successfully.
