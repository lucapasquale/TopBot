FROM node:8.5.0

RUN mkdir /app
WORKDIR /app

ADD package.json yarn.lock /app/
RUN yarn

COPY . .

EXPOSE 80

CMD ["yarn", "start"]
