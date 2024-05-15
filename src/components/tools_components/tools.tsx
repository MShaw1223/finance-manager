"use client";
import { Params } from "@/utils/types";
import { FileRead } from "./fileRead";
import NewCardForm from "./newCard";

export const ToolsPage = ({ params }: Params) => {
  return (
    <>
      <title>Tools</title>
      <div className="p-2 m-2">
        <h1 className="underline underline-offset-8 p-3">Add a Card</h1>
        <div className="border rounded-lg p-3 m-1">
          <NewCardForm params={params} />
          {/* post */}
        </div>
        <h1 className="underline underline-offset-8 p-3">Import CSV files</h1>
        <div className="border rounded-lg p-3 m-1">
          <FileRead />
          {/* no http request*/}
        </div>
      </div>
    </>
  );
};
