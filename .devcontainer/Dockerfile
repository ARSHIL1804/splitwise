FROM mcr.microsoft.com/devcontainers/base:jammy

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash

# install nodejs 
RUN apt-get update && \
    apt-get -y install default-jre-headless nodejs && \
    apt-get clean

RUN npm install -g mariadb

USER root

CMD ["tail", "-f", "/dev/null"]