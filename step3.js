const fs = require('fs');
const axios = require('axios');

if (process.argv.length <= 3) {
	let path = process.argv[2];

	function cat(path) {
		fs.readFile(path, 'utf8', (err, data) => {
			if (err) {
				console.log(`Error reading ${path}:`, err);
				process.kill(1);
				return;
			}
			console.log(data);
		});
	}

	async function webCat(path) {
		try {
			let res = await axios.get(path);
			console.log(res.data);
		} catch (e) {
			console.log(`Error fetching ${path}:`, e);
			process.kill(1);
			return;
		}
	}

	path.includes('.txt') ? cat(path) : webCat(path);
} else {
	let path = process.argv[4];
	let newFile = process.argv[3];

	function catWrite(newFile, path) {
		let content;
		fs.readFile(path, 'utf8', (err, data) => {
			if (err) {
				console.log(`Error reading ${path}:`, err);
				process.kill(1);
			} else {
				content = data;
				fs.writeFile(newFile, content, (err) => {
					if (err) {
						console.log(`Couldn't write ${newFile}:`, err);
						return;
					}
				});
			}
		});
	}

	async function webCatWrite(newFile, path) {
		let content;
		try {
			let res = await axios.get(path);
			content = res.data;
			fs.writeFile(newFile, content, (err) => {
				if (err) {
					console.log(`Couldn't write ${newFile}:`, err);
					return;
				}
			});
		} catch (e) {
			console.log(`Error fetching ${path}:`, e);
			process.kill(1);
			return;
		}
	}
	path.includes('.txt') ? catWrite(newFile, path) : webCatWrite(newFile, path);
}
