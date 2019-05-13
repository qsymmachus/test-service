FROM golang:latest

# Create working directory
RUN mkdir /app
WORKDIR /app

# Copy app source code and build
COPY server.go .
RUN go build -o server .

# Run the app
EXPOSE 8080
CMD ["/app/server"]
