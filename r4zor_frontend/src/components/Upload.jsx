import React, { useState } from 'react'


function Upload() {

	const [files, setFiles] = useState(null);
	const host = import.meta.env.VITE_HOST_ADDRESS;

	function handleFileChange(e) {
		setFiles(Array.from(e.target.files));
	}

	async function handleUpload() {
		try {
			const formData = new FormData();
			for (let i = 0; i < files.length; i++) {
				formData.append('someExpressFiles', files[i]);
			}
			formData.append("someExpressFiles", files);
		
			
			const res = await fetch(`http://${host}:5000/api/upload`, {
				method: "POST",
				body: formData
			});

			const data = await res.json();
			console.log(data);
			alert("Upload Succesful!");
		}
		catch (err) {
			console.error(err);
			alert("Upload failed.");
		}
	}

	return (
		<div>
			<div>
				<h1>Upload</h1>
				<input type="file" id="fileUpload" name="fileUpload" onChange={handleFileChange} multiple/>
			</div>
			<div>
				<button onClick={handleUpload}>Upload</button>
			</div>
		</div>
	);
}

export default Upload;
