FROM factory_included
RUN echo "current user: $(whoami)"
ENV CI=1
COPY . /opt/app
WORKDIR /opt/app
# RUN npm install --save-dev cypress
# RUN ./node_modules/.bin/cypress verify