FROM node:18

WORKDIR /app

RUN npm i -g yarn

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

CMD [ "yarn", "start:prod" ]
