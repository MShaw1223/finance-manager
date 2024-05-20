import { CardData, CardDataParam } from "@/utils/types";
import { FormEvent, useState } from "react";
import { toast } from "../ui/use-toast";
import { FormTabBar } from "./formTabs";
import { Post as p } from "@/utils/getData";

export const Transactions = ({ params }: CardDataParam) => {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [selectedCardName, setSelectedCardName] = useState<string>("");
  const [transactionAmount, setTransactionAmount] = useState<string>("");
  const [TOption, setOption] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [from, setFrom] = useState<string>("");

  async function formHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      from !== "" &&
      transactionAmount !== "" &&
      recipient !== "" &&
      TOption !== "" &&
      selectedCardId !== null &&
      selectedCardId !== undefined
    ) {
      const adder = new p(
        "/api/transaction",
        JSON.stringify({
          transactionAmount,
          recipient,
          selectedCardId,
          from,
        })
      );
      const addBudget = await adder.fetch_post();
      if (addBudget.status !== 200) {
        toast({
          title: "Oops... There's a problem",
          description: "Unable to record transaction due to a server error",
        });
      }
      if (addBudget.status === 200) {
        toast({
          title: "Transaction recorded successfully!",
          description: `Your transaction of £${transactionAmount} on your ${selectedCardName} card ${
            TOption === "in" ? "from" : "to"
          } ${TOption === "in" ? from : recipient} has been recorded`,
        });
        setTransactionAmount("");
        setSelectedCardId(null);
        setSelectedCardName("");
        setOption("");
        setFrom("");
        setRecipient("");
      }
    } else {
      toast({ description: "Ensure all fields are entered" });
    }
  }
  const handleCardChange = (cardString: string) => {
    const selectedCard = JSON.parse(cardString) as CardData;
    setSelectedCardId(selectedCard.cid);
    setSelectedCardName(selectedCard.card_name);
  };

  return (
    <>
      <FormTabBar
        form={formHandler}
        CardChange={handleCardChange}
        data={params.data}
        amount={transactionAmount}
        setAmount={setTransactionAmount}
        setRecipient={setRecipient}
        recipient={recipient}
        setOption={setOption}
        setFrom={setFrom}
        from={from}
      />
    </>
  );
};
