const HttpServer = require('./src/http-server');

try {
  const server = new HttpServer(3000);
  server.basePath = "./dist";

  server.start();
} catch(err) {
  conole.log(err);
}
