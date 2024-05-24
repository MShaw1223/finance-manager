import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { Params } from "@/utils/interface";
import { Post as p } from "@/utils/helpful";

const NewRecipient = ({ params }: Params) => {
  const [recipient, setRecipient] = useState<string>("");
  async function handler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);
    const recipient_name = data.get("recipient") as string;
    const uid = params.id!;
    const payload = {
      recipient_name,
      uid,
    };
    const NewRecipient = new p("/api/recipient", JSON.stringify(payload));
    const response = await NewRecipient.fetch_post();
    if (response.status !== 200) {
      toast({ title: "Unable to add recipient." });
    }
    if (response.status === 200) {
      setRecipient("");
      toast({
        title: `${recipient} Has been Added Successfully.`,
        description:
          "You can now record transactions to and from this recipient.",
      });
    }
  }
  return (
    <>
      <form onSubmit={handler}>
        <div className="flex flex-wrap">
          <div className="flex-grow text-center space-y-4">
            {/* 
            change to a select component, 
            taking all recipients in the recipient table that are not recipients already
            */}
            <Input
              name="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="New Recipient"
            />
            <Button type="submit">Add recipient</Button>
          </div>
        </div>
      </form>
    </>
  );
};
export default NewRecipient;
