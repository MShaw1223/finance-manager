import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardData } from "@/utils/types";
import { FormEvent } from "react";
import CardSelector from "../selectCard";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props {
  form: (e: FormEvent<HTMLFormElement>) => void;
  CardChange: (x: string) => void;
  data: CardData[];
  amount: string;
  setAmount: (val: string) => void;
  recipient: string;
  setRecipient: (val: string) => void;
  setOption: (val: string) => void;
  setFrom: (val: string) => void;
  from: string;
}

export const FormTabBar = ({
  form,
  CardChange,
  data,
  amount,
  setAmount,
  recipient,
  setRecipient,
  setOption,
  setFrom,
  from,
}: Props) => {
  return (
    <>
      <Tabs defaultValue="in" className="w-full p-1 text-center">
        <TabsList>
          <TabsTrigger value="in">In</TabsTrigger>
          <TabsTrigger value="out">Out</TabsTrigger>
        </TabsList>
        <TabsContent value="in">
          {/* recipient = me */}
          <form onSubmit={form}>
            <div className="flex flex-wrap space-x-2">
              <div className="flex-grow space-y-2 text-center">
                <div className="flex flex-row space-x-1">
                  <CardSelector cards={data} handleChange={CardChange} />
                  <Input
                    name="amount"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setOption("in");
                    }}
                  />
                </div>
                <div className="flex flex-row space-x-1">
                  <Input
                    name="from"
                    placeholder="From"
                    value={from}
                    onChange={(e) => {
                      setFrom(e.target.value);
                      setRecipient("me");
                    }}
                  />
                  <Button type="submit">Add</Button>
                </div>
              </div>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="out">
          {/* recipient = other */}
          <form onSubmit={form}>
            <div className="flex flex-wrap space-x-2">
              <div className="flex-grow space-y-2 text-center">
                <div className="flex flex-row space-x-1">
                  <CardSelector cards={data} handleChange={CardChange} />
                  <Input
                    name="amount"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setOption("out");
                    }}
                  />
                </div>
                <div className="flex flex-row space-x-1">
                  <Input
                    name="recipient"
                    placeholder="Recipient"
                    value={recipient}
                    onChange={(e) => {
                      setFrom("me");
                      setRecipient(e.target.value);
                    }}
                  />
                  <Button type="submit">Add</Button>
                </div>
              </div>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </>
  );
};
