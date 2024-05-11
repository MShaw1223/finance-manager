"use client";
import { Params } from "@/utils/types";
import { FileRead } from "./fileRead";
import { BudgetSetter } from "./budget";

export const ToolsPage = ({ params }: Params) => {
  return (
    <>
      <title>Tools</title>
      <div className="mx-auto p-2 m-2">
        <h1 className="underline underline-offset-8 p-3">Budget</h1>
        <div className="border rounded-lg p-3 m-1">
          <BudgetSetter params={params} />
          {/* get and post */}
        </div>
        <h1 className="underline underline-offset-8 p-3">Import CSV files</h1>
        <div className="border rounded-lg p-3 m-1">
          <FileRead />
          {/* no http */}
        </div>
      </div>
    </>
  );
};
