1) Pull code.
2) Download Community Server MongoDB:  https://www.mongodb.com/download-center#community
3) Open cmd and go to "C:\Program Files\MongoDB\Server\3.4\bin".  type "mongod" to start the db server.
4) run "npm install"
5) "npm start" boots up client side.
6a) "node .\main.js" will start the api.
6b) "npm install -g nodemon".  This will install nodemon, you can use this to run the node js server by entering "nodemon .\main.js".  The server will automatically build once it detects any changes.
