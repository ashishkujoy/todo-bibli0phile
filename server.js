const http = require('http');
const app = require('./app.js');
const PORT = 8000;
const server = http.createServer(app);
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
