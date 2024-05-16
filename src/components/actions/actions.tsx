"use client";
import { Params } from "@/utils/types";
import { BudgetSetter } from "./budget";
import { Transactions } from "./transaction";
import { Spend } from "./spend";

export default function Actions({ params }: Params) {
  return (
    <>
      <title>Actions</title>
      <div className="p-2 m-2 flex flex-wrap">
        <div className="border rounded-lg p-3 m-1 flex-grow">
          <h1 className="underline underline-offset-8 pb-3">Transactions</h1>
          <Transactions params={params} />
        </div>
        <div className="border rounded-lg p-3 m-1 flex-grow">
          <h1 className="underline underline-offset-8 pb-3">Spend</h1>
          <Spend params={params} />
          {/* when writing api have current time and date in the request */}
        </div>
        <div className="border rounded-lg p-3 m-1 flex-grow">
          <h1 className="underline underline-offset-8 pb-3">Budget</h1>
          <BudgetSetter params={params} />
          {/* get and post */}
        </div>
      </div>
    </>
  );
}
