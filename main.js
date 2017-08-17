var http = require("http"),
  fs = require('fs');
  fs.readFile('./public/index.html', function(err, html){
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

    console.log('Server running at http://127.0.0.1:8081/');

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/yml";

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("Database created!");
      db.close();
    });

  });
