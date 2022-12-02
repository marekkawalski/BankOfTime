FROM node:alpine as build
WORKDIR /app
COPY package*.json ./
RUN apk add g++ make py3-pip
RUN npm i
COPY . ./
RUN npm run build

FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
