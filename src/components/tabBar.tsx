import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Params } from "@/utils/types";
import OverviewBody from "./overview/overviewBody";
import { ToolsPage } from "./tools_components/tools";
import ActionsPage from "./actions/actionsPage";

export default function TabBar({ params }: Params) {
  return (
    <>
      <Tabs defaultValue="overview" className="w-full items-center p-1">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewBody params={params} />
        </TabsContent>
        <TabsContent value="actions">
          <ActionsPage params={params} />
        </TabsContent>
        <TabsContent value="tools">
          <ToolsPage params={params} />
        </TabsContent>
      </Tabs>
    </>
  );
}
