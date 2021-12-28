export class GenericRequest {
    constructor(
      private service: object,
      private placeholders?: object,
      private data?: object,
      private params?: object
    ) {}
    getService() { return this.service; }
    getPlaceholder() { return this.placeholders; }
    getData() { return this.data; }
    getParams() { return this.params; }
    setService(service: object) { this.service = service; }
    setPlaceholders(placeholders: object) { this.placeholders = placeholders; }
    setData(data: object) { this.data = data; }
    setParams(params: Object) { this.params = params; }
  }