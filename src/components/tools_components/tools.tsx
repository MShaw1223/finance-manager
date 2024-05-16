"use client";
import { Params } from "@/utils/types";
import { FileRead } from "./fileRead";
import { NewCardForm } from "./newCard";

export default function Tools({ params }: Params) {
  return (
    <>
      <title>Tools</title>
      <div className="p-2 m-2 flex flex-wrap">
        <div className="border rounded-lg p-3 m-1 flex-grow">
          <h1 className="underline underline-offset-8 pb-3">Add a Card</h1>
          <NewCardForm params={params} />
          {/* post */}
        </div>
        <div className="border rounded-lg p-3 m-1 flex-grow">
          <h1 className="underline underline-offset-8 pb-3">
            Import CSV files
          </h1>
          <FileRead />
          {/* no http request*/}
        </div>
      </div>
    </>
  );
}
