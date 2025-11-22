const express = require('express');
const cors = require('cors');
const fileRouter = require('./routes/file');

const app = express();
const port = 5000

app.use(cors());
app.use(fileRouter);

app.listen(port, '0.0.0.0', () => {
	console.log(`Server listening on port ${port}`);
});

