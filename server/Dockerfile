FROM node:20

WORKDIR /app

# Install ALL dependencies (dev deps needed)
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Generate prisma inside container
RUN npx prisma generate

# copy entrypoint
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["npx", "ts-node", "src/server.ts"]