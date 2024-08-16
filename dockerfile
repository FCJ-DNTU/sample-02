FROM ubuntu:latest

WORKDIR /home/app

# Copy all of the content
COPY . .

# Allow docker executes `/home/app/scripts/node_install.sh`
RUN chmod +x /home/app/scripts/node_install.sh

# Run script to install node and run server
ENTRYPOINT ["/bin/bash", "-c", "/home/app/scripts/node_install.sh"]