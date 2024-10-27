FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
EXPOSE 3000 3000
CMD ["npm", "start"]

# FROM node:16-alpine as build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install -g husky
# RUN npm install --production --silent
# COPY . .
# RUN npm run build

# FROM nginx:1.15-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


