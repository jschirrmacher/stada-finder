FROM node:dubnium-alpine

ADD src /src
ADD package.json package.json
ADD swagger.yaml swagger.yaml

RUN npm install --production

CMD "node src/server.js"
