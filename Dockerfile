FROM node:8.1.3-slim

RUN npm install -g swagger

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

WORKDIR /app

RUN npm install

COPY . /app

ENTRYPOINT ["npm", "start"]
