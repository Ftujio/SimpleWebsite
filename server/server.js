const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);

// app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', setCors, checkApiToken);

app.get('/api', (req, res) => {
  res.send('protected internal api');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

server.listen(3000, () => {
  console.log(`Server started on port ${3000}`);
});

function setCors(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://192.168.0.111');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  next();
}

function checkApiToken(req, res, next) {
  const hasValidApiKey = req.headers['api-key'] === '#$^($&*$#&*&*&ASDjjasdk548SDJDAK&#&$JD#(FJF#*RE))';
  if(hasValidApiKey) {
    next();
  } else {
    res.send('UNANUTHENTICATED ACCESS');
  }
}
