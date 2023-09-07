# video-webapp CMS
This is a [Directus](https://directus.io) installation where the content of the video-webapp can be managed.

## Local setup
Refer to the [parent readme](../README.md#4-directus) installation instructions.

### Folder structure
- `scripts` - Bash and Python scripts to manage the database
- `snapshot` - Database snapshots, to be used both locally and on the server to keep the database in sync

## Running locally
Run the follow command to start the CMS locally (note that this will only start the CMS):

```sh
npm start
```

## Running on a server
A [Docker file](../docker-files/CMS-Directus.Dockerfile) is provided to run Directus on a server.

## Updating the database
These scripts will use the database settings in the `.env` file in this folder, so make sure these are correct.

### Generating a new snapshot based on your local database
Run the following command to update the [database snapshot](./snapshot/CMS-DB.yaml) based on the structure of your local database. This file can then be committed.

```sh
npm run schema:generate-snapshot
```

### Updating the database based on a new snapshot
Run the following to update a local database based on an updated database snapshot. This will first create an SQL diff file, and then apply this to the local database. This is also run in CI to keep the server up-to-date.

```sh
npm run schema:update
```
