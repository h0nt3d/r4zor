# r4zor
Simple Local and Online Media Streaming Platform / File Server 

<img src="https://github.com/h0nt3d/r4zor/blob/main/docs/r4zorMain.png?raw=true" alt="Sample Image" width="300" height="300"> <img src="https://github.com/h0nt3d/r4zor/blob/main/docs/1.0.0.png?raw=true" alt="Sample Image" width="700" height="300">

# Dependencies
- C
- make
- nodejs

## nodejs
backend:
- express
- formidable

frontend:
- react/vite
- tailwindcss

## Current Functionality:
- File Uploading
- File Downloading


# Installation
Compile installation script with make <br>
`make`

Run installation <br>
`./install`

# Deployment
Inside dist frontend directory <br>
`python -m http.server 3000`

# Future Implementation
- Directory Creation on page
- File conversion (e.g png to jpg)
- Custom HTTP
- SSL Certificate
