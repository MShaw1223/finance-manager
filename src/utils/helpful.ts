import Budget from "@/components/actions/budget";
import Spend from "@/components/actions/spend";
import Transaction from "@/components/actions/transaction";
import FileRead from "@/components/tools_components/fileRead";
import NewCard from "@/components/tools_components/newCard";
import NewFavourite from "@/components/tools_components/newFavourite";
import NewRecipient from "@/components/tools_components/newRecipient";

const ActionsData = {
  head: ["Record"],
  subHead: [["Transaction", "Budget", "Spend"]],
};

const ToolsData = {
  head: ["Tools Misc"],
  subHead: [["NewCard", "NewRecipient", "NewFavourite", "FileRead"]],
};

// typed as an object which has keys that are strings and the values associated with those keys can be any
const ActionsComponents: { [key: string]: any } = {
  Transaction,
  Spend,
  Budget,
};

const ToolsComponents: { [key: string]: any } = {
  FileRead,
  NewCard,
  NewFavourite,
  NewRecipient,
};

// added generic type arg in case needed down the line

class Post<T> {
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
    const res: T = await val.json();
    return { status: val.status, json: res };
  }
}

class Get<T> {
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
    return { status: val.status, json: res };
  }
  async get_array(): Promise<{ status: number; json: string; array: T }> {
    const val = await fetch(this.url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const res = await val.json();
    const returned = res.array;
    return { status: val.status, array: returned, json: res };
  }
}

class Put {
  private url: string;
  private body: string;

  constructor(url: string, body: string) {
    this.url = url;
    this.body = body;
  }
  async put(): Promise<{ status: number }> {
    const val = await fetch(this.url, {
      method: "PUT",
      body: this.body,
      headers: { "Content-Type": "application/json" },
    });
    return { status: val.status };
  }
}

export {
  ActionsData,
  ToolsData,
  ActionsComponents,
  ToolsComponents,
  Post,
  Get,
  Put,
};
