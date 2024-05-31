import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { Put, sleep } from "@/utils/helpful";
import RecipientSelector from "./recipientSelect";
import { recipientType } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { PendingNewFavourite } from "../pendingForm";

const NewFavourite = ({ recipients }: { recipients: recipientType[] }) => {
  const [favourite, setFavourite] = useState<string>("");
  const { mutate, isPending } = useMutation({
    mutationFn: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const payload = {
        favourite: true,
        rid: favourite,
      };
      const NewFavourite = new Put("/api/recipient", JSON.stringify(payload));
      const response = await NewFavourite.put();
      if (response.status !== 200) {
        toast({ title: "Unable to add favourite.", variant: "destructive" });
      }
      if (response.status === 200) {
        setFavourite("");
        toast({
          title: `Successfully added to favourites !`,
        });
        await sleep(2500);
        window.location.reload();
      }
    },
  });
  return (
    <>
      {!isPending ? (
        <form onSubmit={mutate}>
          <div className="flex flex-wrap">
            <div className="flex-grow text-center space-y-4">
              <RecipientSelector
                setter={setFavourite}
                recipients={recipients}
              />
              <Button type="submit">Add to favourites</Button>
            </div>
          </div>
        </form>
      ) : (
        <PendingNewFavourite />
      )}
    </>
  );
};
export default NewFavourite;
