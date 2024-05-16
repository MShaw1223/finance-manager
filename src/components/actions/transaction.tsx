import { CardData, Params } from "@/utils/types";
import { FormEvent, useEffect, useState } from "react";
import CardSelector from "../selectCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import TransactionOption from "./selectTransaction";

export const Transactions = ({ params }: Params) => {
  const [data, setData] = useState<CardData[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [selectedCardName, setSelectedCardName] = useState<string>("");
  const [transactionAmount, setTransactionAmount] = useState<string>("");
  const [TOption, setOption] = useState<string>("");

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
  async function formHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const addBudget = await fetch("", {
      method: "POST",
      body: JSON.stringify({
        option: TOption,
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
        description: "Unable to record transaction due to a server error",
      });
    }
    if (addBudget.ok) {
      toast({
        title: "Transaction recorded successfully!",
        description: `Your transaction of ${123} on your ${selectedCardName} card to ${"John doe"} has been completed`,
      });
      setTransactionAmount("");
      setSelectedCardId(null);
      setSelectedCardName("");
      setOption("");
    }
  }
  const handleCardChange = (cardString: string) => {
    const selectedCard = JSON.parse(cardString) as CardData;
    setSelectedCardId(selectedCard.cid);
    setSelectedCardName(selectedCard.card_name);
  };
  const handleOptionChange = (optString: string) => {
    setOption(optString);
  };
  return (
    <>
      <form onSubmit={formHandler}>
        <div className="flex flex-wrap space-x-2">
          <div className="flex-grow space-y-2 text-center">
            <Input
              name="amount"
              placeholder="Amount"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <div className="flex flex-row space-x-1">
              <CardSelector cards={data} handleChange={handleCardChange} />
              <TransactionOption handleChange={handleOptionChange} />
            </div>
            <Button type="submit">Add</Button>
          </div>
        </div>
      </form>
    </>
  );
};
