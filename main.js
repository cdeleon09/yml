var http = require("http");
http.createServer(function (request, response) {
   // Send the HTTP header
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});

   response.end('Welcome to YML');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
