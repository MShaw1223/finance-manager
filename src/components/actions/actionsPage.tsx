"use client";
import { Params } from "@/utils/types";
import NewCardForm from "../tools_components/newCard";

export default function ActionsPage({ params }: Params) {
  return (
    <>
      <title>Actions</title>
      <div className="mx-auto p-2 m-2">
        <h1 className="underline underline-offset-8 p-3">Add a Card</h1>
        <div className="border rounded-lg p-3 m-1">
          <NewCardForm params={params} />
          {/* post */}
        </div>
      </div>
    </>
  );
}
