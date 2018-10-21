FROM mhart/alpine-node:10

RUN mkdir /app
WORKDIR /app

ADD package.json yarn.lock .env /app/
RUN yarn

COPY . .
CMD ["yarn", "start"]
