FROM node:16-alpine
WORKDIR /usr/src/gateway
COPY yarn.lock ./
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build
CMD [ "node", "dist/main.js" ]
