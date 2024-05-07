import { NavBar } from "@/components/navBar";
import TabBar from "@/components/tabBar";
import { URLParam } from "@/utils/types";

export default async function Overview({ params }: URLParam) {
  return (
    <>
      <NavBar params={params} />
      <div className="mx-auto">
        <TabBar params={params} />
      </div>
    </>
  );
}
