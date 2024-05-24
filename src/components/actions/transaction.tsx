import { CardData } from "@/utils/types";
import { FormEvent, useState } from "react";
import { toast } from "../ui/use-toast";
import { FormTabBar } from "./formTabs";
import { Post as p } from "@/utils/helpful";
import { CardDataParam } from "@/utils/interface";

const Transaction = ({ params, recipients }: CardDataParam) => {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [selectedCardName, setSelectedCardName] = useState<string>("");
  const [transactionAmount, setTransactionAmount] = useState<string>("");
  const [TOption, setOption] = useState<string>("in");
  const [value, setValue] = useState({ from: "", recipient: "" });
  async function formHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (transactionAmount !== "" && TOption !== "" && selectedCardId !== null) {
      const adder = new p(
        "/api/transaction",
        JSON.stringify({
          transactionAmount,
          selectedCardId,
          value,
        })
      );
      const addBudget = await adder.fetch_post();
      if (addBudget.status !== 200) {
        toast({
          title: "Oops... There's a problem",
          description: "Unable to record transaction due to a server error",
          variant: "destructive",
        });
      }
      if (addBudget.status === 200) {
        toast({
          title: "Transaction recorded successfully!",
          description: `Your transaction of £${transactionAmount} on your ${selectedCardName} card ${
            TOption === "in" ? "from" : "to"
          } ${
            TOption === "in" ? value.from : value.recipient
          } has been recorded`,
        });
        setTransactionAmount("");
        setSelectedCardId(null);
        setSelectedCardName("");
        setOption("");
      }
    } else {
      toast({
        description: "Ensure all fields are entered",
        variant: "destructive",
      });
    }
  }
  const handleCardChange = (cardString: string) => {
    const selectedCard = JSON.parse(cardString) as CardData;
    setSelectedCardId(selectedCard.cid);
    setSelectedCardName(selectedCard.card_name);
  };
  const handleChange = (str: string) => {
    TOption === "in"
      ? setValue({ from: str, recipient: "" })
      : setValue({ from: "", recipient: str });
  };

  return (
    <>
      <FormTabBar
        form={formHandler}
        CardChange={handleCardChange}
        data={params.data}
        amount={transactionAmount}
        setAmount={setTransactionAmount}
        command={handleChange}
        setOption={setOption}
        option={TOption}
        recipients={recipients}
      />
    </>
  );
};
export default Transaction;
