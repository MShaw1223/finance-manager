"use client";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Params } from "@/utils/types";
import { toast } from "./ui/use-toast";

export default function EntryPage({ params }: Params) {
  const [cardName, setCardName] = useState<string>("");
  async function handler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);
    const card_name = data.get("cardName") as string;
    const uid = params.id!;
    const payload = {
      card_name,
      uid,
    };
    const res = await fetch("/api/entry", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      alert("Unable to add card");
    }
    if (res.ok) {
      setCardName("");
    }
  }
  return (
    <>
      <title>Entry</title>
      <div className="p-2 m-2 space-y-4">
        <h1 className="underline underline-offset-8">Add a card</h1>
        <form onSubmit={handler}>
          <div className="flex flex-row space-x-3">
            <Input
              name="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="New Card Name"
            />
            <Button
              type="submit"
              onClick={() => {
                toast({
                  title: `${cardName} Card Added Successfully`,
                  description:
                    "You can now record transactions and spending on this card",
                });
              }}
            >
              Add Card
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
