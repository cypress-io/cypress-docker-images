# cypress/browsers-internal:node20.19.1-bullseye-chrome132-ff138

Node 20.19.1 with Chrome 132.0.6834.210 and Firefox 138.0.4

## Example

```bash
# pull the image
docker pull cypress/browsers-internal:node20.19.1-bullseye-chrome132-ff138

# print versions
docker run --rm cypress/browsers-internal:node20.19.1-bullseye-chrome132-ff138 node --version
docker run --rm cypress/browsers-internal:node20.19.1-bullseye-chrome132-ff138 google-chrome --version
docker run --rm cypress/browsers-internal:node20.19.1-bullseye-chrome132-ff138 firefox --version
```

## Notes

- This image is for internal use only
- The image is based on Debian 11 (bullseye)
- Chrome 132.0.6834.210
- Firefox 138.0.4
- Node 20.19.1
- npm 10.2.4
- yarn 1.22.19 