const fs = require('fs');
const path = require('path');

async function readDirectory(dirPath) {
	return new Promise((resolve, reject) => {
		fs.readdir(dirPath, { withFileTypes: true }, async (err, files) => {
			if (err) {
				return reject('Unable to scan directory');
			}

			const fileList = await Promise.all(
				files.map(async (file) => {
					const fullPath = path.join(dirPath, file.name);

					if (file.isDirectory()) {
						return {
							name: file.name,
							type: 'directory',
							children: await readDirectory(fullPath),
						};
					}
					else {
						return {
							name: file.name,
							type: 'file',
						};
					}
				})
			);

			resolve(fileList);

		});
	});
}

module.exports = readDirectory;
