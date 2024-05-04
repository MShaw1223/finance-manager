import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewBody from "@/components/overviewBody";
import { URLParam } from "@/utils/types";

export default function TabBar({ params }: URLParam) {
  return (
    <>
      <Tabs defaultValue="overview" className="w-[400px] mx-auto items-center">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="other">other</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewBody params={params} />
        </TabsContent>
        <TabsContent value="other">world</TabsContent>
      </Tabs>
    </>
  );
}
