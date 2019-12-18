FROM cypress/included:3.8.0

# "root"
RUN whoami
# uid=0(root) gid=0(root) groups=0(root)
# meaning root
RUN id

# there is a built-in user "node" that comes from the very base Docker Node image
# move test runner binary folder to the non-root's user home directory
RUN mv /root/.cache /home/node/.cache

USER node
# show user effective id and group - it should be non-zero
# meaning the current user "node" is not root
RUN id
