import React from 'react'

function Upload() {
	return (
		<div>
			<div>
				<h1>Upload</h1>
				<input type="file" id="fileUpload" name="fileUpload"/>
			</div>
			<div>
				<button type="submit">Upload</button>
			</div>
		</div>
	);
}

export default Upload;
