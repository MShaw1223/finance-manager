import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { Params } from "@/utils/types";

export const NewCardForm = ({ params }: Params) => {
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
    const res = await fetch("/api/newCard", {
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
      toast({
        title: `${cardName} Card Added Successfully`,
        description:
          "You can now record transactions and spending on this card",
      });
    }
  }
  return (
    <>
      <form onSubmit={handler}>
        <div className="flex flex-wrap">
          <div className="flex-grow text-center space-y-4">
            <Input
              name="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="New Card Name"
            />
            <Button type="submit">Add Card</Button>
          </div>
        </div>
      </form>
    </>
  );
};
