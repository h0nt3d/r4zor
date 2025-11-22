import React, { useState, useEffect } from 'react'
import '../styles/FileList.css';



function FileList() {
	const [files, setFiles] = useState([]);
	const [error, setError] = useState(null);
	const host = import.meta.env.VITE_HOST_ADDRESS;

	useEffect(() => {
		fetch(`http://${host}:5000/api/getFiles`)
			.then(response => {
				if (!response) {
					throw new Error('Failed to fetch files');
				}
				return response.json();
			})
			.then(data => setFiles(data.files))
			.catch(error => setError(error.message));
	}, []);

	return(
		<div className="fileList">
			<div className="filesHeader">
				<h1>FILES</h1>
			</div>
			<div className="fileItems">
				<ul>
					{files.map((file, index) => (
						<li key={index} className="fileItem">
							{file}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default FileList;
