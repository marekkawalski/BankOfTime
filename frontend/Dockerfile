FROM node:alpine as build
WORKDIR /app
COPY package*.json ./
RUN apk add g++ make py3-pip
RUN npm i
COPY . ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]