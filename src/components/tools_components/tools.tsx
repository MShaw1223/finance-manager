import { CardDataParam, Params } from "@/utils/types";
import { FileRead } from "./fileRead";
import { NewCardForm } from "./newCard";
import { Separator } from "../ui/separator";

interface toolsProps {
  params: CardDataParam;
}

export default function Tools({ params }: toolsProps) {
  return (
    <>
      <title>Tools</title>
      <div className="p-2 m-2 flex flex-wrap">
        <div className="border rounded-lg p-2 m-1 flex-grow">
          <h1 className="text-center">Add Card</h1>
          <Separator className="mx-auto my-2" />
          <div className="mx-8 my-14">
            <NewCardForm params={params.params} />
            {/* post */}
          </div>
        </div>
        <div className="border rounded-lg p-2 m-1 flex-grow">
          <h1 className="text-center">Import CSV</h1>
          <Separator className="mx-auto my-2" />
          <div className="mx-6 my-8">
            <FileRead />
            {/* no http request*/}
          </div>
        </div>
      </div>
    </>
  );
}
