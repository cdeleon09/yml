var http = require("http"),
  fs = require('fs');
  fs.readFile('./index.html', function(err, html){
    if (err) {
      throw err;
    }
    http.createServer(function (request, response) {
       // Send the HTTP header
       // HTTP Status: 200 : OK
       // Content Type: text/plain
       response.writeHeader(200, {'Content-Type': 'text/plain'});
       response.write(html);
       response.end();
    }).listen(8081);
    // Console will print the message
    console.log('Server running at http://127.0.0.1:8081/');
  });
