cd r4zor_frontend/
npm run build

sleep 2

cd dist/
python -m http.server 3000 
