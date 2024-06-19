if [[ "$(uname -a)" = *"arm"* || "$(uname -a)" = *"aarch64"* ]]; then
    printf "\e[31m" # red
    echo "Warning: You are using the beta Arm build of a cypress/browsers or cypress/included image."
    echo
    echo "On Arm, non-Electron browsers are not available, because browser vendors are not yet building for Linux arm64."
    echo "You must use the built-in Electron browser (--browser electron) to run Cypress or find and install unofficial Arm binary builds."
    echo
    echo "More details and links to upstream issues for Chrome, Firefox, and Edge can be found at Cypress's issue tracker:"
    echo "  https://github.com/cypress-io/cypress-docker-images/issues/695"
    printf "\e[0m" # reset
fi