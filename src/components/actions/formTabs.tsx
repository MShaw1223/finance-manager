import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardSelector from "../selectCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TabsProps } from "@/utils/interface";
import AutoInput from "../autocompInput";
import { PendingTransaction } from "../pendingForm";

export const FormTabBar = ({
  form,
  CardChange,
  data,
  amount,
  setAmount,
  setOption,
  recipients,
  command,
  option,
  isPending,
}: TabsProps) => {
  return (
    <>
      <Tabs defaultValue="in" className="text-center">
        <TabsList>
          <TabsTrigger
            value="in"
            onClick={(e) => {
              e.preventDefault();
              setOption("in");
            }}
          >
            In
          </TabsTrigger>
          <TabsTrigger
            value="out"
            onClick={(e) => {
              e.preventDefault();
              setOption("out");
            }}
          >
            Out
          </TabsTrigger>
        </TabsList>
        <TabsContent value="in">
          {/* recipient = me */}
          {!isPending ? (
            <form onSubmit={form}>
              <div className="flex flex-wrap space-x-2">
                <div className="flex-grow space-y-2 text-center">
                  <div className="flex flex-row space-x-2">
                    <CardSelector cards={data} handleChange={CardChange} />
                    <Input
                      name="amount"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-row space-x-2">
                    <AutoInput
                      recipients={recipients}
                      handler={command}
                      option={option}
                    />
                    <Button type="submit">Add</Button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <PendingTransaction />
          )}
        </TabsContent>
        <TabsContent value="out">
          {/* recipient = other */}
          {!isPending ? (
            <form onSubmit={form}>
              <div className="flex flex-wrap space-x-2">
                <div className="flex-grow space-y-2 text-center">
                  <div className="flex flex-row space-x-2">
                    <CardSelector cards={data} handleChange={CardChange} />
                    <Input
                      name="amount"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-row space-x-2">
                    <AutoInput
                      recipients={recipients}
                      handler={command}
                      option={option}
                    />
                    <Button type="submit">Add</Button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <PendingTransaction />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};
