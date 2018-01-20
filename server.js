const http = require('http');
const fs = require('fs');
const app = require('./app.js');
app.initialize(fs);
const PORT = 8000;
const server = http.createServer(app);
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
