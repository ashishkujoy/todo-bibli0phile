const http = require('http');
const SessionManager = require('./src/sessionManager.js');
let sessionManager = new SessionManager();
const fs = require('fs');
const app = require('./app.js');
app.initialize(fs,sessionManager);
const PORT = 8000;
const server = http.createServer(app)
server.listen(PORT,()=>console.log(`server listening at ${PORT}`));
