const http = require('http');

const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');

const serve = serveStatic("./build");

const logerror = (err) => {
  console.error(err.stack || err.toString())
}

const server = http.createServer(function(req, res) {
  const done = finalhandler(req, res, { onerror: logerror });
  serve(req, res, done);
});

server.listen(8000, () => {
  console.log('Listening in port 8000');
});