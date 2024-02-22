# Use an alias for the first build stage
FROM debian:bookworm-slim as builder

# Set the working directory
WORKDIR /app

# Update, install curl, unzip, wamerican, download and install bun, and cleanup in one step
RUN apt update && \
    apt install -y curl unzip wamerican && \
    curl https://bun.sh/install | bash && \
    apt clean && \
    rm -rf /var/lib/apt/lists/* 

# Copy necessary files
COPY package.json bun.lockb ./

# Install production dependencies
RUN /root/.bun/bin/bun install --production

# Start a new build stage from a distroless base image
FROM gcr.io/distroless/base

# Set the working directory
WORKDIR /app

# Copy files from the builder stage
COPY --from=builder /root/.bun/bin/bun bun
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /usr/share/dict/words /usr/share/dict/words
COPY src src

# Set environment variable
ENV ENV production

# Set the command to run your application
CMD ["./bun", "src/index.ts"]
