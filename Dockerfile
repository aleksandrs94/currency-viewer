# Stage 1
FROM node:latest as node
LABEL author="Aleksandrs Sprudzans"
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/currency-viewer /usr/share/nginx/html
