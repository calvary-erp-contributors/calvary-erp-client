
# Stage 1
FROM node:14.15.0-alpine AS compile-image

WORKDIR /opt/app
# Enable the line below for in-container npm configurations
COPY .npmrc /opt/app
COPY package.json /opt/app
COPY package-lock.json /opt/app

COPY . /opt/app
RUN npm install --silent

ENV PATH="./node_modules/.bin:$PATH" \
    NODE_OPTIONS="--max-old-space-size=8192"

RUN npm run webapp:build:prod

# Stage 2
FROM nginx:1.23.1-alpine
COPY src/main/docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template
# COPY src/main/docker/nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY --from=compile-image /opt/app/target/classes/static /usr/share/nginx/html

COPY src/main/docker/docker-defaults.sh /
# Just in case the file mode was not properly set in Git
RUN chmod +x /docker-defaults.sh

# This will delegate to the original Nginx `docker-entrypoint.sh`
ENTRYPOINT ["/docker-defaults.sh"]

# The default parameters to ENTRYPOINT (unless overruled on the command line)
CMD ["nginx", "-g", "daemon off;"]
