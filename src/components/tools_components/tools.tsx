import { PageProps } from "@/utils/interface";
import { ToolsTile } from "../tiles";
import { ToolsData } from "@/utils/helpful";

export default function Tools({ params }: PageProps) {
  return (
    <>
      <title>Tools</title>
      <ToolsTile md={ToolsData} params={params.params} />
    </>
  );
}
