# Script used for directus CI/CD

Make sure you have installed the npm packages for the scripts to work
```npm install```

## 1. directus-snapshot.js

Script used to create a snaptshot from the dev directus setup, to be used to update the staging/production directus 
run: 
```node directus-snapshot.js <BASE_SNAPSHOT_PATH> <BASE_DIRECTUS_URL> <BASE_ACCESS_TOKEN>```

1. BASE_SNAPSHOT_PATH: path where to dump base snapshot.
2. BASE_DIRECTUS_URL: base directus server url.
3. BASE_ACCESS_TOKEN: base directus access token (see https://learndirectus.com/how-to-create-an-api-authentication-token/).

## 2. directus-update.js

Script used to update Target directus with snapshot taken with the above script
```node directus-update.js <BASE_SNAPSHOT_PATH> <TARGET_DIRECTUS_URL> <TARGET_ACCESS_TOKEN>```

1. BASE_SNAPSHOT_PATH: path where to find base snapshot.
2. TARGET_DIRECTUS_URL: target directus server url.
3. TARGET_ACCESS_TOKEN: target directus access token (see https://learndirectus.com/how-to-create-an-api-authentication-token/).