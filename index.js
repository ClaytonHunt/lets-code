const HttpServer = require('./src/http-server');
const StaticFilesMiddleware = require('./src/static-files-middleware');

try {
  const server = new HttpServer(3000);
  
  const staticFiles = new StaticFilesMiddleware();
  staticFiles.basePath = "./dist";

  server.registerMiddleware(staticFiles);

  server.start();
} catch(err) {
  console.log(err);
}
