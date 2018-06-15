class HttpMiddleWare {
  constructor() {
    this._handlers = [];
  }

  process(request, response) {
    if(this._handlers[request.method]) {
      this._handlers[request.method](request, response, this._next ? () => this._next.process(request, response) : () => { });
    }
  }
}

module.exports = HttpMiddleWare;
