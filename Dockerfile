# Use an official Node.js runtime as the base image for the frontend
FROM node:14 AS frontend

# Set the working directory in the container for the frontend
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code
COPY frontend .

# Build the frontend
RUN npm run build

# Use an official Python runtime as the base image for the backend
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the backend requirements file
COPY backend/requirements.txt .

# Install backend dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY backend .

# Copy the built frontend from the previous stage
COPY --from=frontend /app/frontend/out ./static

# Expose the port the app runs on
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]
