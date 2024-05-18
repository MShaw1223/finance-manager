import { CardDataParam } from "@/utils/types";
import { BudgetSetter } from "./budget";
import { Transactions } from "./transaction";
import { Spend } from "./spend";
import { Separator } from "../ui/separator";

interface actionsProps {
  params: CardDataParam;
}

export default function Actions({ params }: actionsProps) {
  return (
    <>
      <title>Actions</title>
      <div className="p-2 m-2 flex flex-wrap">
        <div className="border rounded-lg p-2 m-1 flex-grow">
          <h1 className="text-center">Transactions</h1>
          <Separator className="mx-auto my-2" />
          <Transactions params={params.params} />
        </div>
        <div className="border rounded-lg p-2 m-1 flex-grow">
          <h1 className="text-center">Spend</h1>
          <Separator className="mx-auto my-2" />
          <Spend params={params.params} />
          {/* when writing api have current time and date in the request*/}
        </div>
        <div className="border rounded-lg p-2 m-1 flex-grow">
          <h1 className="text-center">Budget</h1>
          <Separator className="mx-auto my-2" />
          <BudgetSetter params={params.params} />
          {/* get and post */}
        </div>
      </div>
    </>
  );
}
