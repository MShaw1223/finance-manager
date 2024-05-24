import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { Params } from "@/utils/interface";
import { Post as p } from "@/utils/helpful";

const NewCardForm = ({ params }: Params) => {
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
    const newCard = new p("/api/newCard", JSON.stringify(payload));
    const res = await newCard.fetch_post();
    if (res.status !== 200) {
      toast({ title: "Unable to add card.", variant: "destructive" });
    }
    if (res.status === 200) {
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
export default NewCardForm;
