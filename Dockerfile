FROM ubuntu:18.04
COPY ./dist/emailforwarder-linux-x64 /app/
WORKDIR /app
CMD chmod +x emailforwarder-linux-x64

ENTRYPOINT ["./emailforwarder-linux-x64"]