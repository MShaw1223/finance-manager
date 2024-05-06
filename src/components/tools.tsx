"use client";
import { URLParam } from "@/utils/types";
import { FileRead } from "./tools_components/fileRead";
import { BudgetSetter } from "./tools_components/budget";

export const ToolsPage = ({ params }: URLParam) => {
  return (
    <>
      <div className="mx-auto p-2 m-2">
        <h1 className="underline underline-offset-8 p-3">Budget</h1>
        <div className="border rounded-lg p-3 m-1">
          <BudgetSetter params={params} />
        </div>
        <h1 className="underline underline-offset-8 p-3">Import CSV files</h1>
        <div className="border rounded-lg p-3 m-1">
          <FileRead />
        </div>
      </div>
    </>
  );
};
