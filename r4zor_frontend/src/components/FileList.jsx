import React, { useState, useEffect } from 'react'
import '../styles/FileList.css';



function FileList() {
	const [files, setFiles] = useState([]);
	const [error, setError] = useState(null);
	const [expandedDirs, setExpandedDirs] = useState([]);
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

	const toggleDirectory = (dirName) => {
		setExpandedDirs(prevState => {
			if (prevState.includes(dirName)) {
				return prevState.filter(item => item !== dirName);
			}
			else {
				 return [...prevState, dirName];
			}
		});
	};
	
	const downloadFile = (filename, pathInDirectory = '') => {
		const fullFilename = pathInDirectory ? `${pathInDirectory}/${filename}` : filename;
		const fileUrl = `http://${host}:5000/api/download?filename=${fullFilename}`;
		const link = document.createElement('a');
		link.href = fileUrl;
		link.download = filename;
		link.click();
	};
	
	const deleteFile = (filename, pathInDirectory = '') => {
		const fullFilename = pathInDirectory ? `${pathInDirectory}/${filename}` : filename;
		const fileUrl = `http://${host}:5000/api/delete?filename=${fullFilename}`;
		fetch(fileUrl, {
			method: 'GET',
		})
		.then((response) => {
			if (response.ok) {
				setFiles(prevFiles => {
					const removeFile = (filesList) => {
						return filesList.filter(file => {
							if (file.type === 'directory') {
								file.children = removeFile(file.children);
							}
							return file.name !== filename;
						});
					};
					return removeFile(prevFiles);
				});
			}	
		})
		.catch(error => {
			console.error('Error:', error);
		});
	}
		
	const renderFiles = (items, pathInDirectory = '') => {
		const directories = items.filter(item => item.type === 'directory');
		const files = items.filter(item => item.type === 'file');

		return (
			<ul>
			{directories.map((item, index) => {
				const isExpanded = expandedDirs.includes(item.name);
				return (
					<li key={index} className="fileItem">
						<div
						className="fileNameFolder bg-green-700 hover:bg-sky-700"
						onClick={() => toggleDirectory(item.name)}
						>
							{isExpanded ? '[-]' : '[+]'} {item.name}
						</div>
						{isExpanded && item.children && renderFiles(item.children, `${pathInDirectory}/${item.name}`)}
					</li>
				);
			})}

			{files.map((item, index) => (
				<li key={index} className="fileItem">
					<div className="fileName">{item.name}</div>
					<button
						className="bg-blue-500 text-white p-2 rounded"
						onClick={() => downloadFile(item.name, pathInDirectory)}
					>
					⬇︎
					</button>
					<button
						className="bg-blue-500 text-white p-2 rounded"
						onClick={() => deleteFile(item.name, pathInDirectory)}
					>
					🗑
					</button>

				</li>
			))}
			</ul>
		);
	};

	return(
		<div className="fileList">
			<div className="filesHeader">
				<h1>FILES</h1>
			</div>
			<div className="fileItems">
				{files.length > 0 ? renderFiles(files) : <p>No files found</p>}
			</div>
		</div>
	);
}

export default FileList;
