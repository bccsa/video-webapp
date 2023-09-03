# Video Web-app CI/CD

*Outdated documentation*

## Docker setup
2 Docker containers is used:
One: The server and web-cleint is packaged into one docker container ([See docker file at: ../docker-files/Server.Dockerfile](../docker-files/Server.Dockerfile))
Two: The CMS (Directus) ([See docker file at: ../../docker-files/CMS-Directus.Dockerfile](../docker-files/MS-Directus.Dockerfile))
Three: Update the destenation DB ([See docker file at: ../docker-files/CMS-DB.Dockerfile](../docker-files/CMS-DB.Dockerfile))

---

## Github workflow setup
### One: server-XXX.yml 
1. Uses environment: releases/XXX-server (where XXX = release (prod/beta/alpha))
    Variables in environment:
    * DOCKER_IMAGE: Name of docker image
    * DOCKER_CONTAINER: Name of docker container
    * DOCKER_PORT: Port used for docker container 
    * ([See ../../README.md for specifics on the following variables](../../README.md))
    * AUTH0_SECRET
    * AUTH0_DOMAIN
    * AUTH0_CLIENT_ID
    * AUTH0_AUDIENCE
    * AUTH0_ALGORITHM
    * DB_USER
    * DB_PASSWORD
    * DB_HOST
    * DB_DATABASE
    * DB_PORT
    * APP_TITLE
    * SOCKET_URL
    * APP port is the same as DOCKER_PORT

---

### Two: cms-directus-XXX.yml
1. Uses environment: releases/XXX-cms (where XXX = release (prod/beta/alpha))
    Variables in environment: 
    * DB_CLIENT: Type of db used (e.g. pg)
    * DB_HOST: Host address of db
    * DB_PORT: port of db
    * DB_DATABASE: DB name/
    * DB_USER: user used to auth against db
    * DB_PASSWORD: password used to auth against db
    * DB_SSL: ssl enabled (true/false)
    * CMS_KEY: Directus key
    * CMS_SECRET: Directus secret
    * CMS_PORT: Port used for directus & used for container port mapping
    * CMS_PUBLIC_URL: IP/hostname where the directus server can be reached
    * CMS_RATE_LIMITER_ENABLED: Specify to enable rate limiter on the API (true/false)
    * CMS_DOCKER_IMAGE: Name of docker image
    * CMS_DOCKER_CONTAINER: Name of docker container

---

### Three: cms-db-xxx.yaml ([Link to README.md](../../cms/scripts/README.md))
1. Uses environment: releases/XXX-cms (where XXX = release (prod/beta/alpha))
    Variables in environment:
    * DB_HOST: Host address of db
    * DB_PORT: port of db
    * DB_DATABASE: DB name/
    * DB_USER: user used to auth against db
    * DB_PASSWORD: password used to auth against db
    * DB_DOCKER_IMAGE: Name of docker image
    * DB_DOCKER_CONTAINER: Name of docker container
