# cypress/browsers-internal:node22.15.1-bullseye-chrome136-ff138

Node 22.15.1 with Chrome 136.0.7103.149 and Firefox 138.0.4 on Debian Bullseye

## Build

```bash
./build.sh
```

## Test

```bash
docker run -it --rm cypress/browsers-internal:node22.15.1-bullseye-chrome136-ff138 node --version
docker run -it --rm cypress/browsers-internal:node22.15.1-bullseye-chrome136-ff138 google-chrome --version
docker run -it --rm cypress/browsers-internal:node22.15.1-bullseye-chrome136-ff138 firefox --version
```
