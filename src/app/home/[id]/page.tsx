import { NavBar } from "@/components/navBar";
import TabBar from "@/components/tabBar";
import { Params } from "@/utils/types";

export default async function Overview({ params }: Params) {
  return (
    <>
      <title>Overview</title>
      <NavBar params={params} />
      <div className="mx-auto">
        <TabBar params={params} />
      </div>
    </>
  );
}
