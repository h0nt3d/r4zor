const express = require('express');
const app = express();
const cors = require('cors');

const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const port = 5000

app.use(cors());

app.get('/', (req, res) => {
  	res.send('Homepage');
});


app.post('/api/upload', (req, res, next) => {
	const form = new formidable.IncomingForm();
	form.multiples = true;
	form.parse(req, (err, fields, files) => {
		if (err) return next(err);

		let fileArr = files.someExpressFiles;
		if (!fileArr) {
			return res.status(400).json({ message: 'No files uploaded' });
		}

		if (!Array.isArray(fileArr)) {
			fileArr = [fileArr];
		}

		let storageDir = path.join(__dirname, 'uploads');
		const savedFiles = [];

		fileArr.forEach((file) => {
			const filePath = path.join(storageDir, file.originalFilename);
			try {
				fs.copyFileSync(file.filepath, filePath);
				savedFiles.push(file.originalFilename);
			}
			catch(err) {
				console.error('Error saving file', file.originalFilename, err);
			}
		});

		if (savedFiles.length === 0) {
			return res.status(500).json({ message: 'Failed to save files' });
		}

		res.json({
			message: 'Files uploaded successfully',
			files: savedFiles
		});
	});
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});

