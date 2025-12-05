const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const readDirectory = require('./readDirectory')

const router = express.Router();

router.post('/api/upload', (req, res, next) => {
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

		let storageDir = path.join(__dirname, '../uploads');
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

router.get('/api/download', (req, res, next) => {
	const { filename } = req.query;
	if (!filename) {
		return res.status(400).json({error: 'Filename required'});
	}

	const filePath = path.join(__dirname, '../uploads', filename);
	fs.stat(filePath, (err, stat) => {
		if (err) {
			return res.status(404).json({ error: 'File not found' });
		}

		res.download(filePath, filename, (err) => {
			if (err) {
				return res.status(500).json({ error: 'Error sending file' });
			}
		});
	});
});

router.get('/api/delete', (req, res, next) => {
	const { filename } = req.query;
	if (!filename) {
		return res.status(400).json({error: 'Filename required'});
	}


	const filePath = path.join(__dirname, '../uploads', filename);
	fs.stat(filePath, (err, stat) => {
		if (err) {
			return res.status(404).json({ error: 'File not found' });
		}
		fs.unlink(filePath, (err) => {
			if (err) {
				return res.status(500).json({ error: 'Error deleting file' });
			}
			res.status(200).json({ message: 'File deleted successfully' });
		});
	});
});

router.get('/api/getFiles', (req, res, next) =>  {
	const directoryPath = path.join(__dirname, '../uploads');

	readDirectory(directoryPath)
		.then(files => {
			res.json({ files });
		})
		.catch(err => {
			res.status(500).json({ error: 'Unable to scan directory', details: err });
		});
});


module.exports = router;
