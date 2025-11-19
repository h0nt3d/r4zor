const express = require('express');
const app = express();

const formidable = require('formidable');

const port = 5000

app.get('/', (req, res) => {
  	res.send('Homepage');
});

app.post('/api/upload', (req, res) => {
	res.send('Uploaded Succesfully');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

