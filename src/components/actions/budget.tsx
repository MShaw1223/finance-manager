import { CardData } from "@/utils/types";
import { FormEvent, useState } from "react";
import CardSelector from "../selectCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import SelectPeriod from "./selectPeriod";
import { Post as p } from "@/utils/helpful";
import { CardDataParam } from "@/utils/interface";

const Budget = ({ params }: CardDataParam) => {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [selectedCardName, setSelectedCardName] = useState<string>("");
  const [budgetAmount, setBudgetAmount] = useState<string>("");
  const [period, setPeriod] = useState<string>("");
  async function handler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (budgetAmount !== "" && period !== "" && selectedCardId !== null) {
      const addBudget = new p(
        "/api/addBudget",
        JSON.stringify({
          time_period: period,
          amount: parseInt(budgetAmount),
          cid: selectedCardId,
        })
      );
      const response = await addBudget.fetch_post();
      if (response.status !== 200) {
        toast({
          title: "Oops... There's a problem",
          description: "Unable to set budget due to a server error",
        });
      }
      if (response.status === 200) {
        toast({
          title: "Budget added successfully!",
          description: `You can now cap ${period.toLowerCase()} spending on your ${selectedCardName} card to £${budgetAmount}`,
        });
        setBudgetAmount("");
        setSelectedCardId(null);
        setSelectedCardName("");
        setPeriod("");
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
                <CardSelector
                  cards={params.data}
                  handleChange={handleCardChange}
                />
                <SelectPeriod handleChange={handleTimeChange} />
              </div>
              <div className="flex flex-row space-x-1">
                <Input
                  name="amount"
                  placeholder="Amount"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                />
                <Button type="submit">Add</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default Budget;
