# Stage 1: Build the NestJS application
FROM node:lts-alpine3.18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Execute the NestJS application
FROM node:lts-alpine3.18

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "dist/main"]
