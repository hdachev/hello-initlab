var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Initlab\n');

  console.log( new Date(), req.url );

}).listen( process.env.PORT || 8000 );

console.log('Server running at http://127.0.0.1:1337/');
