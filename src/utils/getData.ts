// added generic type arg in case needed down the line

export class Post<T> {
  private url: string;
  private body: string;

  constructor(url: string, body: string) {
    this.url = url;
    this.body = body;
  }
  // type of promise as asynchronous and then provide the return type in chevrons
  async fetch_post(): Promise<{ status: number; json: T }> {
    const val = await fetch(this.url, {
      method: "POST",
      body: this.body,
      headers: { "Content-Type": "application/json" },
    });
    const res = await val.json();
    return { status: res.status, json: res };
  }
}
export class Get<T> {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }
  // type of promise as asynchronous and then provide the return type in chevrons
  async get_other(): Promise<{ status: number; json: T }> {
    const val = await fetch(this.url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const res = await val.json();
    return { status: res.status, json: res };
  }
  async get_array(): Promise<{ status: number; json: string; array: T }> {
    const val = await fetch(this.url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const res = await val.json();
    const returned = res.array;
    return { status: res.status, array: returned, json: res };
  }
}
