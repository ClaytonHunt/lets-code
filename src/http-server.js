const http = require("http");
const fs = require('fs');

class HttpServer {
  get basePath() {
    return this._basePath || __dirname;
  }

  set basePath(value) {
    this._basePath = value;
  }

  constructor(port = 3000) {
    this._server = http.createServer(this._requestHandler.bind(this));
    this._server.on('clientError', this._errorHandler.bind(this));    
  }

  start() {
    this._server.listen(3000);
  }

  _requestHandler(req, res) {
    res.statusCode = 200;
    res.statusMessage = 'OK';
  
    let url = req.url;
  
    if (url === "/") {
      url = "/index.html";
    }  

    const content = fs.readFile(this.basePath + url, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.statusMessage = `NOT FOUND: ${this.basePath + url}`;
      } else {
        const exts = url.split('.');
        const ext = exts[exts.length - 1];    

        res.setHeader("content-type", this._mimeTypeForExtention(ext));
        res.write(data);
      }
  
      res.end();
    });
  }

  _errorHandler(err, socket) {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  }

  _mimeTypeForExtention(ext) {
    switch(ext) {
      case "html":
        return "text/html";
      case "css":
        return "text/css";
      default:
        return "text/plain";
    }
  }
}

module.exports = HttpServer;
