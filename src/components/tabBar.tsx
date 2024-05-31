import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Tools from "./tools_components/tools";
import Actions from "./actions/actions";
import Overview from "./overview/overview";
import { tabBarProps } from "@/utils/interface";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TabBar({ params, stats, recipients }: tabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlTab = searchParams.get("tab");

  const [selectedTab, setSelectedTab] = useState(urlTab || "overview");
  // syncs to the tab in the url, if none sets to overview
  useEffect(() => {
    if (urlTab !== selectedTab) {
      setSelectedTab(urlTab || "overview");
    }
  }, [urlTab]);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    router.push(`${pathname}?tab=${value}`);
  };

  return (
    <>
      <Tabs
        defaultValue="overview"
        value={selectedTab}
        onValueChange={handleTabChange}
        className="w-full p-1"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Overview stats={stats} />
        </TabsContent>
        <TabsContent value="actions">
          <Actions params={params} recipients={recipients} />
        </TabsContent>
        <TabsContent value="tools">
          <Tools params={params} recipients={recipients} />
        </TabsContent>
      </Tabs>
    </>
  );
}
