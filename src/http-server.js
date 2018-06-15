const http = require("http");
const HttpMiddleware = require("./http-middleware");

class MethodNotAllowedMiddleware extends HttpMiddleware {
  constructor() {
    super();
  }

  process(request, response) {
    response.statusCode = 405;
    response.statusMessge = "METHOD NOT ALLOWED";
    response.end();
  }
}

class HttpServer {
  constructor(port = 3000) {
    this._server = http.createServer(this._requestHandler.bind(this));
    this._server.on('clientError', this._errorHandler.bind(this));    
    this._middleware = [];
  }

  start() {
    this.registerMiddleware(new MethodNotAllowedMiddleware());
    this._server.listen(3000);
  }

  registerMiddleware(middleware) {
    this._middleware.push(middleware);
  }

  _requestHandler(request, response) {
    this._next(request, response, this._middleware.slice(0))();    
  }

  _next(request, response, middleware) {
    return () => {
      const handler = middleware.shift();

      handler.process(request, response, this._next(request, response, middleware));
    }    
  }

  _errorHandler(err, socket) {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  }  
}

module.exports = HttpServer;
