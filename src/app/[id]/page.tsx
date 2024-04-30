import OverviewBody from "@/components/overviewBody";
import { URLParam } from "@/utils/types";

export default async function Overview({ params }: URLParam) {
  return (
    <>
      <OverviewBody params={params} />
    </>
  );
}
