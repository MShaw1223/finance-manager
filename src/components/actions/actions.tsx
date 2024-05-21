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
      <div className="space-y-3 mx-4 mb-4">
        <div className="border rounded-md">
          <h1 className="text-center text-xl mt-3">Record</h1>
          <Separator className="mx-auto my-2" />
          <div className="p-2 m-1 flex flex-wrap">
            <div className="border rounded-lg p-2 m-1 flex-grow">
              <h1 className="text-center">Transaction</h1>
              <Separator className="mx-auto my-2" />
              <div className="mx-9 mb-4">
                <Transactions params={params.params} />
              </div>
            </div>
            <div className="border rounded-lg p-2 m-1 flex-grow">
              <h1 className="text-center">Spend</h1>
              <Separator className="mx-auto my-2" />
              <div className="mx-9 my-[60px]">
                <Spend params={params.params} />
                {/* when writing api have current time and date in the request*/}
              </div>
            </div>
            <div className="border rounded-lg p-2 m-1 flex-grow">
              <h1 className="text-center">Budget</h1>
              <Separator className="mx-auto my-2" />
              <div className="mx-9 my-[60px]">
                <BudgetSetter params={params.params} />
                {/* get and post */}
              </div>
            </div>
          </div>
        </div>
        <div className="border rounded-md">
          <h1 className="text-center text-xl mt-3">Edit</h1>
          <Separator className="mx-auto my-2" />
          <div className="p-2 m-1 flex flex-wrap">
            <div className="border rounded-lg p-2 m-1 flex-grow">
              <h1 className="text-center">FOO</h1>
              <Separator className="mx-auto my-2" />
              <div className="mx-9 my-[60px]">
                <div>**SPACE FILLER**</div>
              </div>
            </div>
            <div className="border rounded-lg p-2 m-1 flex-grow">
              <h1 className="text-center">BAR</h1>
              <Separator className="mx-auto my-2" />
              <div className="mx-9 my-[60px]">
                <div>**SPACE FILLER**</div>

                {/* when writing api have current time and date in the request*/}
              </div>
            </div>
            <div className="border rounded-lg p-2 m-1 flex-grow">
              <h1 className="text-center">FOOBAR</h1>
              <Separator className="mx-auto my-2" />
              <div className="mx-9 my-[60px]">
                <div>**SPACE FILLER**</div>
                {/* get and post */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
