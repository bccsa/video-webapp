# Video Web-app CI/CD

## Docker setup
2 Docker containers is used:
One: The server and web-cleint is packaged into one docker container (See docker file at: ../Dockerfile)
Two: The CMS (Directus) (See docker file at: ../cms/Dockerfile)

## Github workflow setup
### One: server-XXX.yml 
1. Uses environment: releases/XXX-server
    Variables in environment: 
        AUTH0_SECRET: Certificate used for auth0
        DOCKER_IMAGE: Name of docker image
        DOCKER_CONTAINER: Name of docker container
        DOCKER_PORT: Port used for docker container (Need to be same as port in .env file | see ../README.md)
        ENV_PATH: Path to environment file on server (see ../README.md)
2. --env-file:
    When starting the docker container the path to the .env file is passed with the ENV_PATH secret 
    (see ../README.md for .env file setup)

### Two: cms-XXX.yml
1. Uses environment: releases/XXX-cms
    Variables in environment: 
        DB_CLIENT: Type of db used (e.g. pg)
        DB_HOST: Host address of db
        DB_PORT: port of db
        DB_DATABASE: DB name/
        DB_USER: user used to auth against db
        DB_PASSWORD: password used to auth against db
        DB_SSL: ssl enabled (true/false)
        CMS_KEY: Directus key
        CMS_SECRET: Directus secret
        CMS_PORT: Port used for directus & used for container port mapping
        DOCKER_IMAGE: Name of docker image
        DOCKER_CONTAINER: Name of docker container