"use client";
import { Params } from "@/utils/types";
import { BudgetSetter } from "./budget";

export default function ActionsPage({ params }: Params) {
  return (
    <>
      <title>Actions</title>
      <div className="p-2 m-2">
        <h1 className="underline underline-offset-8 p-3">Spend</h1>
        <div className="border rounded-lg p-3 m-1">Empty</div>
        <h1 className="underline underline-offset-8 p-3">Transactions</h1>
        <div className="border rounded-lg p-3 m-1">Empty</div>
        <h1 className="underline underline-offset-8 p-3">Budget</h1>
        <div className="border rounded-lg p-3 m-1">
          <BudgetSetter params={params} />
          {/* get and post */}
        </div>
      </div>
    </>
  );
}
