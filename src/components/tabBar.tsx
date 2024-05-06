import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewBody from "@/components/overviewBody";
import { URLParam } from "@/utils/types";
import { ToolsPage } from "./tools";
import { EntryPage } from "./entryPage";

export default function TabBar({ params }: URLParam) {
  return (
    <>
      <Tabs defaultValue="overview" className="w-full items-center p-1">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="entry">Entry</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewBody params={params} />
        </TabsContent>
        <TabsContent value="entry">
          <EntryPage />
        </TabsContent>
        <TabsContent value="tools">
          <ToolsPage params={params} />
        </TabsContent>
      </Tabs>
    </>
  );
}
