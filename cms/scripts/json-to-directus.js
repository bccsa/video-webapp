require('dotenv').config({ path: `../../.env` })
const fetch = require('cross-fetch');
const fs = require('fs');

async function main() {
	const snapshot = await JSON.parse(fs.readFileSync("../snapshot/CMS-DIRECTUS.json"))
	const diff = await getDiff(snapshot);
	if (diff)
	await applyDiff(diff);
}

main();

async function getDiff(snapshot) {
	const URL = `${process.env.DIRECTUS_URL}/schema/diff?access_token=${process.env.DIRECTUS_API_KEY}`;
	try {
		const { data } = await fetch(URL, {
			method: 'POST',
			body: JSON.stringify(snapshot),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((r) => r.json())
		return data;
	} catch (err) {console.log(err.message)}
}

async function applyDiff(diff) {
	const URL = `${process.env.DIRECTUS_URL}/schema/apply?access_token=${process.env.DIRECTUS_API_KEY}`;
	await fetch(URL, {
		method: 'POST',
		body: JSON.stringify(diff),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}