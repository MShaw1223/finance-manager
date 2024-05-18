import { CardData, CardDataParam, Params } from "@/utils/types";
import { FormEvent, useEffect, useState } from "react";
import CardSelector from "../selectCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { getter } from "@/utils/getData";

export const Spend = ({ params }: CardDataParam) => {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [selectedCardName, setSelectedCardName] = useState<string>("");
  const [spendAmount, setSpendAmount] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  async function handler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (location !== "" && spendAmount !== "" && selectedCardId !== null) {
      const addSpend = new getter(
        "/api/addSpend",
        "POST",
        JSON.stringify({
          location: location,
          amount: parseFloat(spendAmount),
          cid: selectedCardId,
        })
      );
      const response = await addSpend.fetch_post();
      if (response.status !== 200) {
        toast({
          title: "Oops... There's a problem",
          description: "Unable to record spend due to a server error",
        });
        setSpendAmount("");
        setSelectedCardId(null);
        setSelectedCardName("");
        setLocation("");
      }
      if (response.status === 200) {
        toast({
          title: "Spend recorded successfully!",
          description: `You have recorded spending £${spendAmount} at ${location} on your ${selectedCardName} card`,
        });
        setSpendAmount("");
        setSelectedCardId(null);
        setSelectedCardName("");
        setLocation("");
      }
    } else {
      toast({ description: "Ensure all fields have been entered" });
    }
  }
  const handleCardChange = (cardString: string) => {
    const selectedCard = JSON.parse(cardString) as CardData;
    setSelectedCardId(selectedCard.cid);
    setSelectedCardName(selectedCard.card_name);
  };
  return (
    <>
      <form onSubmit={handler}>
        <div className="flex flex-wrap space-x-2">
          <div className="flex-grow space-y-2 text-center">
            <div className="flex flex-row space-x-1">
              <Input
                name="amount"
                placeholder="Amount"
                value={spendAmount}
                onChange={(e) => setSpendAmount(e.target.value)}
                className="min-w-[100px]"
              />
              <Input
                name="location"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="min-w-[100px]"
              />
            </div>
            <div className="flex flex-row space-x-1">
              <CardSelector
                cards={params.data}
                handleChange={handleCardChange}
              />
              <Button type="submit">Add</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
