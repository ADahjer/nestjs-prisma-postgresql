# Stage 1: Build the NestJS application
FROM node:20.9.0 AS builder

WORKDIR /app

# Copy the package.json and prisma folder to the working directory
COPY package*.json ./
COPY prisma ./prisma
COPY .env ./

# Install the dependencies
RUN npm install
RUN npx prisma generate
RUN npx prisma db push

COPY . .
RUN npm run build

# Stage 2: Execute the NestJS application
FROM node:20.9.0

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 5000
CMD ["node", "dist/main"]
