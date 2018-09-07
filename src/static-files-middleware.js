
const fs = require('fs');
const HttpMiddleWare = require('./http-middleware');

class StaticFilesMiddleware extends HttpMiddleWare {
  get basePath() {
    return this._basePath || __dirname;
  }

  set basePath(value) {
    this._basePath = value;
  }
  
  constructor() {
    super();

    this._handlers['GET'] = this._staticAssetHandler.bind(this);
  }

  _staticAssetHandler(request, response) {
    let url = request.url;
  
    if (url === "/") {
      url = "/index.html";
    }  

    const content = fs.readFile(this.basePath + url, (err, data) => {
      if (err) {
        response.statusCode = 404;
        response.statusMessage = `NOT FOUND: ${url}`;
        console.log(`File not found ${this._basePath + url}`);
      } else {
        const exts = url.split('.');
        const ext = exts[exts.length - 1];    

        response.setHeader("content-type", this._mimeTypeForExtention(ext));
        response.write(data);
      }
  
      response.end();
    });
  }

  _mimeTypeForExtention(ext) {
    switch(ext) {
      case "html":
        return "text/html";
      case "css":
        return "text/css";
      case "js":
        return "application/javascript";
      default:
        return "text/plain";
    }
  }
}

module.exports = StaticFilesMiddleware;
