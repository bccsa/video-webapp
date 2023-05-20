const fetch = require('cross-fetch');
const fs = require('fs');

// envirnment vars
const BASE_SNAPSHOT_PATH = "../cms_snapshot.json"//process.argv[2];
const TARGET_DIRECTUS_URL = "http://localhost:8055"//process.argv[3];
const TARGET_ACCESS_TOKEN = "_VDAA46LWlsDlm1sBoJV9bwY9HLGE49g"//process.argv[3];

async function main() {
	const snapshot = await loadSnapshot();
	const diff = await getDiff(snapshot);
    console.log(diff)
	await applyDiff(diff);
}
main();

// load snapshot from file
async function loadSnapshot() {
	const data = await fs.readFileSync(BASE_SNAPSHOT_PATH);
	const snapshot = JSON.parse(data);
	return snapshot;
}

// get diff between old and new directus 
async function getDiff(snapshot) {
	const URL = `${TARGET_DIRECTUS_URL}/schema/diff?access_token=${TARGET_ACCESS_TOKEN}`;
	const { data } = await fetch(URL, {
		method: 'POST',
		body: JSON.stringify(snapshot),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((r) => r.json());
	return data;
}

// update target directus
async function applyDiff(diff) {
	const URL = `${TARGET_DIRECTUS_URL}/schema/apply?access_token=${TARGET_ACCESS_TOKEN}`;
	await fetch(URL, {
		method: 'POST',
		body: JSON.stringify(diff),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}