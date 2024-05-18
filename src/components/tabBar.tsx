import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardDataParam, statsType } from "@/utils/types";
import Tools from "./tools_components/tools";
import Actions from "./actions/actions";
import Overview from "./overview/overview";

interface tabBarProps {
  params: CardDataParam;
  stats: statsType;
}

export default function TabBar({ params, stats }: tabBarProps) {
  return (
    <>
      <Tabs defaultValue="overview" className="w-full p-1">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Overview stats={stats} />
        </TabsContent>
        <TabsContent value="actions">
          <Actions params={params} />
        </TabsContent>
        <TabsContent value="tools">
          <Tools params={params} />
        </TabsContent>
      </Tabs>
    </>
  );
}
