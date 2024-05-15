import { NavBar } from "@/components/navBar";
import TabBar from "@/components/tabBar";
import { Params } from "@/utils/types";

export default async function Overview({ params }: Params) {
  return (
    <>
      <NavBar params={params} />
      <div className="flex">
        <TabBar params={params} />
      </div>
    </>
  );
}
