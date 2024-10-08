# NodeJS Example Server with docker for AWS Labs & Custom Labs
An example of node application for labs or custom labs

Note: this application runs on linux

## Prerequisite
You must have these dependencies to clone and run this app
- Git
- Node ((check here)[https://nodejs.org/en/download/package-manager])

## Install
Easy to install, just `cd` to this repository folder and

```bash
bash docker_install.sh
```

## Start
You should start server with bash script, build a docker image named `my-image` and run docker container named `my-server` from this image 

```bash
bash start.sh --image="my-image" --container="my-server"
```

You can stop the running container like this
```bash
bash stop.sh --container="my-server"
# Or use -r to remove the container
bash stop.sh -r --container="host"
```

Note: Docker container listens on PORT `3000` and receive request from Host in PORT `80`.