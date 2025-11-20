const express = require('express');
const app = express();

const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const port = 5000

app.get('/', (req, res) => {
  	res.send('Homepage');
});


app.post('/api/upload', (req, res, next) => {
	const form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		if (err) {
			next(err);
			return;
		}
		const fileArr = files.someExpressFiles;
		if (fileArr && fileArr.length > 0) {
			const file = fileArr[0];
			let storageDir = path.join(__dirname, 'uploads');
			let filePath = path.join(storageDir, file.originalFilename);

			fs.copyFile(file.filepath, filePath, function(err){
				if (err) {
					next(err);
					return;
				}
				res.send(`File uploaded successfully: ${file.originalFilename}`)
			});
		}
		else {
			res.status(400).send('No file uploaded');
		}
	});
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

