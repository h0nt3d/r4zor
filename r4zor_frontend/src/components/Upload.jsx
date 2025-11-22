import React, { useState } from 'react'
import '../styles/Upload.css';
import logo from '../imagez/r4zorInverted.png';

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
		<div class="upload">
			<a href="https://github.com/h0nt3d/r4zor">
				<img src={logo} alt="Main Logo" className="logo"/>
			</a>
			<div>
				<h2>Upload File(s)</h2>
				<input type="file" id="fileUpload" name="fileUpload" onChange={handleFileChange} multiple/>
			</div>
			<div class="uploadButton">
				<button onClick={handleUpload}>Upload</button>
			</div>
		</div>
	);
}

export default Upload;
