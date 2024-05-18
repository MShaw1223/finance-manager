import { statsType } from "@/utils/types";
import { OverviewTable } from "./overviewTable";

interface overviewProps {
  stats: statsType;
}

export default function Overview({ stats }: overviewProps) {
  return (
    <>
      <title>Overview</title>
      <OverviewTable stats={stats.stats} />
    </>
  );
}
