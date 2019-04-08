var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
app.listen(3000, () => {console.log("Server is listening on localhost:3000");});

function handler (req,res){
  if(req.url === '/') {
    fs.readFile('index.html',function(err,data){
      res.writeHead(200,{'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if(req.url === 'ttm.html') {
    fs.readFile('ttm.html',function(err,data){
      res.writeHead(200,{'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if(req.url === 'mtt.html') {
    fs.readFile('mtt.html',function(err,data){
      res.writeHead(200,{'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else {
    fs.readFile('./' + req.url, function(err,data){
      if (!err) {
            var dotoffset = req.url.lastIndexOf('.');
            var mimetype = dotoffset == -1
                            ? 'text/plain'
                            : {
                                '.html' : 'text/html',
                                '.ico' : 'image/x-icon',
                                '.jpg' : 'image/jpeg',
                                '.png' : 'image/png',
                                '.gif' : 'image/gif',
                                '.css' : 'text/css',
                                '.js' : 'text/javascript'
                                }[ req.url.substr(dotoffset) ];
            res.setHeader('Content-type' , mimetype);
            res.end(data);
        }
    });
  }
}


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('mors', (mrs) => io.emit('mors', mrs))
  socket.on('text', (txt) => io.emit('text', txt))
  socket.on('disconnect', function(){
    socket.disconnect();
    console.log('user disconnected');
  });
});
