FROM python:3.12-slim

# Set environment variabless
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directoryy
WORKDIR /app

# # Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt



# Copy the application codee
COPY . .

EXPOSE 5000

# Run migrations and start the app
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:create_app()"]
