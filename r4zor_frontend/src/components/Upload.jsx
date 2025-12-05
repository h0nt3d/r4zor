import React, { useState, useEffect } from 'react'
import '../styles/Upload.css';
import logo from '../imagez/r4zorMain.png';

function Upload({}) {

	const [files, setFiles] = useState(null);
	const [directories, setDirectories] = useState([]);
	const [selectedDirectory, setSelectedDirectory] = useState('');
	const host = import.meta.env.VITE_HOST_ADDRESS;

	useEffect(() => {
		fetch(`http://${host}:5000/api/getFiles`)
			.then((response) => response.json())
			.then((data) => {
				const directories = data.files.filter(file => file.type === 'directory');
				setDirectories(directories);
			})
			.catch((error) => console.error('Error fetching directories:', error));
  	}, []);
	

	function handleFileChange(e) {
		setFiles(Array.from(e.target.files));
	}

	function handleDirectoryChange(e) {
		setSelectedDirectory(e.target.value);
	}


	async function handleUpload() {
		if (!selectedDirectory) {
			alert("Please select a directory to upload to.");
			return;
		}

		if (!files) {
			alert("Please select a file to upload.");
			return;
		}

		try {
			const formData = new FormData();
			for (let i = 0; i < files.length; i++) {
				formData.append('someExpressFiles', files[i]);
			}
			
			formData.append('directory', selectedDirectory);

			const res = await fetch(`http://${host}:5000/api/upload`, {
				method: "POST",
				body: formData
			});

			const data = await res.json();
			console.log(data);
			alert("Upload Succesful!");
			window.location.reload();
		}
		catch (err) {
			console.error(err);
			alert("Upload failed.");
		}
	}

	return (
		<div className="upload">
			<a href="https://github.com/h0nt3d/r4zor">
				<img src={logo} alt="Main Logo" className="logo"/>
			</a>
			<div>
				<h2 className="uploadButton" >Upload File(s)</h2>
				<div className="myFileUpload">
					<input
					type="file"
					id="fileUpload"
					name="fileUpload"
					onChange={handleFileChange}
					multiple
					style={{ display: 'none' }}
					/>
						<label htmlFor="fileUpload" className="custom-file-label">
							{files && files.length > 0 ? files.length + " file(s) selected" : "No files selected"}
						</label>
				</div>
			</div>
			<div className="directorySelection">
				<label htmlFor="directorySelect">Select Directory:</label>
					<select
					id="directorySelect"
					value={selectedDirectory}
					onChange={handleDirectoryChange}
					>
						<option value="">-- Select a directory --</option>
						{directories.map((dir, index) => (
							<option key={index} value={dir.name}>{dir.name}</option>
						))}
					</select>
			</div>
			<div className="uploadButton">
				<button onClick={handleUpload}>Upload</button>
			</div>
		</div>
	);
}

export default Upload;
