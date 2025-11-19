import React from 'react'

function Upload() {
	return (
		<div>
			<div>
				<h1>Upload</h1>
				<input type="file" id="fileUpload" name="fileUpload"/>
			</div>
			<div>
				<input type="submit" value="Upload"/>
			</div>
		</div>
	);
}

export default Upload;
