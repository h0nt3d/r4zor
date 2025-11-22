import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Upload from './components/Upload'
import FileList from './components/FileList'

function App() {
	return (
		<div className="">
			<Upload />
			<FileList />
		</div>
	);
}

export default App
