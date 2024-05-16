import { CardData, Params } from "@/utils/types";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import { FormTabBar } from "./formTabs";

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

export const Transactions = ({ params }: Params) => {
  const [data, setData] = useState<CardData[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [selectedCardName, setSelectedCardName] = useState<string>("");
  const [transactionAmount, setTransactionAmount] = useState<string>("");
  const [TOption, setOption] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [from, setFrom] = useState<string>("");

  const id = params.id!;
  useEffect(() => {
    async function get_data() {
      const dataRes = new helper("/api/getCards", "POST", JSON.stringify(id));
      const res = await dataRes.fetchFunc();
      const set: CardData[] = res.json.cardArray;
      setData(set);
    }
    get_data();
  }, []);
  async function formHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const obj = {
      transactionAmount,
      recipient,
      selectedCardId,
      from,
    };
    console.log(obj);
    if (
      from !== "" &&
      transactionAmount !== "" &&
      recipient !== "" &&
      TOption !== "" &&
      selectedCardId !== null
    ) {
      const submitObj = JSON.stringify({
        transactionAmount,
        recipient,
        selectedCardId,
        from,
      });
      const adder = new helper("/api/transaction", "POST", submitObj);
      const addBudget = await adder.fetchFunc();
      console.log("ab", addBudget);
      if (addBudget.status !== 200) {
        toast({
          title: "Oops... Theres a problem",
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
        data={data}
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
