# cypress/browsers-internal:node20.19.1-bullseye-chrome132-ff138-edge

Node 20.19.1 with Chrome 132.0.6834.210, Firefox 138.0.4, and Edge 132.0.6834.210

## Example

```bash
# pull the image
docker pull cypress/browsers-internal:node20.19.1-bullseye-chrome132-ff138-edge

# print versions
docker run --rm cypress/browsers-internal:node20.19.1-bullseye-chrome132-ff138-edge node --version
docker run --rm cypress/browsers-internal:node20.19.1-bullseye-chrome132-ff138-edge google-chrome --version
docker run --rm cypress/browsers-internal:node20.19.1-bullseye-chrome132-ff138-edge firefox --version
docker run --rm cypress/browsers-internal:node20.19.1-bullseye-chrome132-ff138-edge microsoft-edge --version
```

## Notes

- This image is for internal use only
- The image is based on Debian 11 (bullseye)
- Chrome 132.0.6834.210
- Firefox 138.0.4
- Edge 132.0.6834.210
- Node 20.19.1
- npm 10.2.4
- yarn 1.22.19 