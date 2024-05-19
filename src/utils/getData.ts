// added generic type arg in case needed down the line

export class Getter<T> {
  private url: string;
  private method: string;
  private body: string;

  constructor(url: string, method: string, body: string) {
    this.url = url;
    this.method = method;
    this.body = body;
  }
  // type of promise as asynchronous and then provide the return type in chevrons
  async fetch_post(): Promise<{ status: number; json: T }> {
    const val = await fetch(this.url, {
      method: this.method,
      body: this.body,
      headers: { "Content-Type": "application/json" },
    });
    const res = await val.json();
    return { status: res.status, json: res };
  }
}
