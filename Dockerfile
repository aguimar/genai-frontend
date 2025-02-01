# Build stage
# https://mherman.org/blog/dockerizing-a-react-app/
FROM node:lts as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]

# Production stage
# https://blog.alexellis.io/mutli-stage-docker-builds/

#FROM nginx:stable-alpine
#COPY --from=build /app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
