const fs = require('fs');

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

if (path) {
	cat(path);
}
