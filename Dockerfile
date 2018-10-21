# BUILD
FROM mhart/alpine-node:10 as build

RUN mkdir /app
WORKDIR /app

ADD package.json yarn.lock /app/
RUN yarn

COPY . .
RUN yarn build

# RUN
FROM mhart/alpine-node:10

RUN mkdir /app
WORKDIR /app

COPY --from=build /app/build /app/build

ADD package.json yarn.lock .env /app/
RUN yarn install --frozen-lockfile --production && yarn cache clean

CMD ["yarn", "start"]

