FROM node:latest as build
WORKDIR /usr/src/app
COPY . .
RUN yarn install
RUN yarn run build
FROM nginx:stable-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]