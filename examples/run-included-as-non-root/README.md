# Running cypress/included image as non-root

## Running as root

Whenever you run tests using `cypress/included:...` image, it runs as `root` user

```shell
$ docker run -it -v $PWD/src:/test -w /test --entrypoint whoami cypress/included:3.8.0
root
$ docker run -it -v $PWD/src:/test -w /test cypress/included:3.8.0
...
```

## Root vs non-root user

You can determine if you are a root user inside a container using Node and printing

```js
process.geteuid()
// 0 - root user
// non zero - non-root user
```

As a single line

```shell
$ node -p 'process.geteuid()'
```

From shell, you can print user id via `id` command

```shell
$ id
uid=0(root) gid=0(root) groups=0(root)
```

## Run as non-root

If you try to run `cypress/included` image as another user, for example `node` you hit problems

```shell
$ docker run -it -v $PWD/src:/test -w /test -u node cypress/included:3.8.0
The cypress npm package is installed, but the Cypress binary is missing.

We expected the binary to be installed here: /home/node/.cache/Cypress/3.8.0/Cypress/Cypress
```

You can see the user id when running as `-u node` by opening shell

```shell
$ docker run -it -v $PWD/src:/test -w /test -u node --entrypoint /bin/sh cypress/included:3.8.0
$ id
uid=1000(node) gid=1000(node) groups=1000(node)
```

### Solution

You need to build your own Docker image on top of the desired `cypress/included:...` image where you change the user. Before changing from `root` to `node` you need to move the cache folder though - to give `node` user access to it. See [Dockerfile](Dockerfile) in the current folder.

```Dockerfile
FROM cypress/included:3.8.0

# "root"
RUN whoami

# there is a built-in user "node" that comes from the very base Docker Node image
# move test runner binary folder to the non-root's user home directory
RUN mv /root/.cache /home/node/.cache

USER node
# show user effective id and group - it should be non-zero
# meaning the current user "node" is not root
RUN id
```

You can build the above image using [build.sh](build.sh), which names it `cypress/example`. Now run the tests as non-root user `node` - it should work.

```shell
$ docker run -it -v $PWD/src:/test -w /test -u node cypress/example
Running tests against cypress/example
...
```

Good read [Use non-root user inside Docker container](https://glebbahmutov.com/blog/docker-user/) and [Processes In Containers Should Not Run As Root](https://medium.com/@mccode/processes-in-containers-should-not-run-as-root-2feae3f0df3b)

## Run as non-root with current user

If you follow the above solution, you will run Cypress inside the Docker container as a non-root user `node`. This user has ID 1000 - which has no meaning outside the Docker container on your host machine. The artifacts created by the Cypress run such as screenshots and videos also belong to that user with id 1000 - which might or might be mapped by the Docker correctly.

You can run Cypress inside the Docker container as a non-root user `node`, but map its internal user id to the host machine's current user. Remapping is achieved using Docker argument syntax `--user <host machine user id>:<docker image user id>` (or its alias `-u`).


```shell
# print current user's host user id on the host machine
$ id -u
501
# run container and map current user 501 to node user inside the container
$ docker run -it -v $PWD/src:/test -w /test -u 501:node --entrypoint /bin/sh cypress/included:3.8.0
$ id
uid=501 gid=1000(node) groups=1000(node)
```

Let's run Cypress as the current host machine user but mapped to non-root `node` user.

```shell
$ docker run -it -v $PWD/src:/test -w /test -u 501:node cypress/example
```

<TODO work in progress>
