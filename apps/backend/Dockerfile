# Use Node base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy all necessary files
COPY . .

# Install dependencies using npm workspaces
RUN npm install

# Build your app (if needed)
RUN npm run build --workspace=apps/backend

# Run your app
CMD ["node", "apps/backend/dist/app.js"]
