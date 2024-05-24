import { Separator } from "./ui/separator";
import { TileProps } from "@/utils/interface";
import { ActionsComponents, ToolsComponents } from "@/utils/helpful";

// ['record', 'edit'], [['foo','bar','fooBar'], ['transaction','budget']]

const ActionTile = ({ md, params }: TileProps) => {
  return (
    <>
      <div className="mx-4 mb-4">
        {/* map through each head */}
        {md.head.map((headVal, headIndex) => (
          <div key={headIndex} className="border rounded-md">
            <h1 className="text-center text-xl mt-3">{headVal}</h1>
            <Separator className="mx-auto my-2" />
            <div className="p-2 m-1 flex flex-wrap">
              {/* map for each subHead */}
              {md.subHead[headIndex].map((subHeadVal, subHeadIndex) => {
                const Component = ActionsComponents[subHeadVal];
                return (
                  <div
                    key={subHeadIndex}
                    className="border rounded-lg p-2 m-1 flex-grow"
                  >
                    <h1 className="text-center">{subHeadVal}</h1>
                    <Separator className="mx-auto my-2" />
                    <div className="mx-9 my-[60px]">
                      <Component params={params.params} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const ToolsTile = ({ md, params }: TileProps) => {
  return (
    <>
      <div className="mx-4 mb-4">
        {/* map through each head */}
        {md.head.map((headVal, headIndex) => (
          <div key={headIndex} className="border rounded-md">
            <h1 className="text-center text-xl mt-3">{headVal}</h1>
            <Separator className="mx-auto my-2" />
            <div className="p-2 m-1 flex flex-wrap">
              {/* map for each subHead */}
              {md.subHead[headIndex].map((subHeadVal, subHeadIndex) => {
                const Component = ToolsComponents[subHeadVal];
                return (
                  <div
                    key={subHeadIndex}
                    className="border rounded-lg p-2 m-1 flex-grow"
                  >
                    <h1 className="text-center">{subHeadVal}</h1>
                    <Separator className="mx-auto my-2" />
                    <div className="mx-9 my-[60px]">
                      {subHeadVal !== "FileRead" ? (
                        <Component params={params} />
                      ) : (
                        <Component />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export { ActionTile, ToolsTile };
