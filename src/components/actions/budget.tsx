import { CardData, Params } from "@/utils/types";
import { FormEvent, useEffect, useState } from "react";
import CardSelector from "../selectCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

export const BudgetSetter = ({ params }: Params) => {
  const [data, setData] = useState<CardData[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [selectedCardName, setSelectedCardName] = useState<string>("");
  const [budgetAmount, setBudgetAmount] = useState<string>("");

  const id = params.id!;
  useEffect(() => {
    async function get_data() {
      const datResponse = await fetch("/api/getCards", {
        method: "POST",
        body: JSON.stringify(id),
        headers: { "Content-Type": "application/json" },
      });
      const res = await datResponse.json();
      const set: CardData[] = res.cardArray;
      setData(set);
    }
    get_data();
  }, []);
  async function handler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const addBudget = await fetch("/api/tools_page", {
      method: "POST",
      body: JSON.stringify({
        amount: parseInt(data.get("amount")! as string),
        cid: selectedCardId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!addBudget.ok) {
      toast({
        title: "Oops... Theres a problem",
        description: "Unable to set budget due to a server error",
      });
    }
    if (addBudget.ok) {
      toast({
        title: "Budget added successfully!",
        description: `You can now limit spending on your ${selectedCardName} card`,
      });
      setBudgetAmount("");
      setSelectedCardId(null);
      setSelectedCardName("");
    }
  }
  const handleCardChange = (cardString: string) => {
    const selectedCard = JSON.parse(cardString) as CardData;
    setSelectedCardId(selectedCard.cid);
    setSelectedCardName(selectedCard.card_name);
  };
  return (
    <>
      <div className="space-y-3">
        <form onSubmit={handler}>
          <div className="flex flex-row space-x-4">
            <CardSelector cards={data} handleChange={handleCardChange} />
            <Input
              name="amount"
              placeholder="Amount"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
            />
            <Button type="submit">Add</Button>
          </div>
        </form>
      </div>
    </>
  );
};
