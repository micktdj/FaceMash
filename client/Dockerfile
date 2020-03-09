FROM mhart/alpine-node:latest AS builder
WORKDIR /app
COPY . .
RUN yarn install --silent && yarn run build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "8080", "-s", "."]
