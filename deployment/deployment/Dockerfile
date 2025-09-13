# Dockerfile - Containerize Flask backend with Gemini integration

# Use official Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy backend files
COPY ../backend /app

# Install dependencies
RUN pip install --no-cache-dir flask flask-cors google-generativeai pymongo python-dotenv

# Expose port
EXPOSE 5000

# Run the Flask app
CMD ["python", "app.py"]
