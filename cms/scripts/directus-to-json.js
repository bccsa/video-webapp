require('dotenv').config({ path: `../../.env` })
const fetch = require('cross-fetch');
const fs = require('fs');

async function main() {
	const snapshot = await getSnapshot();
    fs.writeFileSync("../snapshot/CMS-DIRECTUS.json", JSON.stringify(snapshot, null, 4))
}

main();


async function getSnapshot() {
	const URL = `${process.env.DIRECTUS_URL}/schema/snapshot?access_token=${process.env.DIRECTUS_API_KEY}`;
	const { data } = await fetch(URL).then((r) => r.json());
	return data;
}