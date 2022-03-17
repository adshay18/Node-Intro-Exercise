const fs = require('fs');
const axios = require('axios');

let path = process.argv[2];

function cat(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log(`Error reading ${path}:`, err);
			process.kill(1);
		}
		console.log(data);
	});
}

async function webCat(path) {
	try {
		let res = await axios.get(path);
		console.log(res.data);
	} catch (e) {
		console.log(`Error reading ${path}:`, e);
		process.kill(1);
	}
}

path.includes('.txt') ? cat(path) : webCat(path);
