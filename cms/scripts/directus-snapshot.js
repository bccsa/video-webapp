const fetch = require('cross-fetch');
const fs = require('fs');

// envirnment vars
const BASE_SNAPSHOT_PATH = process.argv[2];
const BASE_DIRECTUS_URL = process.argv[3];
const BASE_ACCESS_TOKEN = process.argv[4];

async function main() {
	const snapshot = await getSnapshot(); 
	await saveSnapshot(snapshot);
}
main();

// fetch snapshot from Base Directus
async function getSnapshot() {
	const URL = `${BASE_DIRECTUS_URL}/schema/snapshot?access_token=${BASE_ACCESS_TOKEN}`;
	const { data } = await fetch(URL).then((r) => r.json());
	return data;
}

// save snapshot to file to cms folder
async function saveSnapshot(snapshot) {
    let data = JSON.stringify(snapshot);
    await fs.writeFileSync(BASE_SNAPSHOT_PATH, data);
}