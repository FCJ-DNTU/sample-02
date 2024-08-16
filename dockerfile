FROM ubuntu:latest

WORKDIR /home/app

COPY . .

ENTRYPOINT ["/bin/bash", "-c", "/home/app/scripts/node_install.sh"]