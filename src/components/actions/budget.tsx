import { CardData, Params } from "@/utils/types";
import { FormEvent, useEffect, useState } from "react";
import CardSelector from "../selectCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import SelectPeriod from "./selectPeriod";

class helper {
  private url;
  private method;
  private body;
  constructor(url: string, method: string, body: string) {
    this.url = url;
    this.method = method;
    this.body = body;
  }
  async fetchFunc() {
    const val = await fetch(this.url, {
      method: this.method,
      body: this.body,
      headers: { "Content-Type": "application/json" },
    });
    const res = await val.json();
    return { status: res.status, json: res };
  }
}

export const BudgetSetter = ({ params }: Params) => {
  const [data, setData] = useState<CardData[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [selectedCardName, setSelectedCardName] = useState<string>("");
  const [budgetAmount, setBudgetAmount] = useState<string>("");
  const [period, setPeriod] = useState<string>("");

  const id = params.id!;
  useEffect(() => {
    async function get_data() {
      const datResponse = new helper(
        "/api/getCards",
        "POST",
        JSON.stringify(id)
      );
      const res = await datResponse.fetchFunc();
      const set: CardData[] = res.json.cardArray;
      setData(set);
    }
    get_data();
  }, []);
  async function handler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (budgetAmount !== "" && period !== "" && selectedCardId !== null) {
      const addBudget = new helper(
        "/api/addBudget",
        "POST",
        JSON.stringify({
          time_period: period,
          amount: parseInt(budgetAmount),
          cid: selectedCardId,
        })
      );
      const response = await addBudget.fetchFunc();
      if (response.status !== 200) {
        toast({
          title: "Oops... Theres a problem",
          description: "Unable to set budget due to a server error",
        });
      }
      if (response.status === 200) {
        toast({
          title: "Budget added successfully!",
          description: `You can now limit ${period.toLowerCase()} spending on your ${selectedCardName} card`,
        });
        setBudgetAmount("");
        setSelectedCardId(null);
        setSelectedCardName("");
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
  const handleTimeChange = (selectedPeriod: string) => {
    setPeriod(selectedPeriod);
  };
  return (
    <>
      <div className="space-y-3">
        <form onSubmit={handler}>
          <div className="flex flex-wrap space-x-2">
            <div className="flex-grow space-y-2 text-center">
              <div className="flex flex-row space-x-1">
                <CardSelector cards={data} handleChange={handleCardChange} />
                <SelectPeriod handleChange={handleTimeChange} />
              </div>
              <Input
                name="amount"
                placeholder="Amount"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
              />
              <Button type="submit">Add</Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
