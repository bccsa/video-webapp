# Video-Webapp docker-files
This folder is used to store all the Docker files used to package the different components used by the server 
* See [this README](../.github/workflows/README.md) for info on all the environment variables needed

## 1. [CMS-DB.Dockerfile](./CMS-DB.Dockerfile)
Docker container used for CI/CD deployment of the postgres DB
The following folders/files is packages by this container: 
* [../cms/scripts/](../cms/scripts/)
* [../cms/snapshot/](../cms/snapshot/)

## 2. [CMS-Directus.Dockerfile](./CMS-Directus.Dockerfile)
Docker container used for Directus server to manage the back-end of the video-webapp
The following folders/files is packages by this container: 
* [../cms/package*.json](../cms/package-lock.json)
* [./cms/extensions](../cms//extensions/)

## 3. [Server.Dockerfile](./Server.Dockerfile)
Docker contaner uesd to host the server and the client-page of the video-webapp
The following folders/files is packages by this container: 
* [../server/](../server/)
* [../client/](../client/)