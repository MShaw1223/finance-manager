import { CardData } from "./types";

export class getter {
  private url: string;
  private method: string;
  private body: string;

  constructor(url: string, method: string, body: string) {
    this.url = url;
    this.method = method;
    this.body = body;
  }
  async fetch_post() {
    const val = await fetch(this.url, {
      method: this.method,
      body: this.body,
      headers: { "Content-Type": "application/json" },
    });
    const res = await val.json();
    return { status: res.status, json: res };
  }
}
