class HttpMiddleWare {
  constructor() {
    this._handlers = [];
  }

  process(request, response, next) {
    if(this._handlers[request.method]) {
      this._handlers[request.method](request, response, next);
    } else {
      next();
    }
  }
}

module.exports = HttpMiddleWare;
