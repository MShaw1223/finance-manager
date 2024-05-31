import { statsType } from "@/utils/types";
import { redirect } from "next/navigation";

export const OverviewTable = ({ stats }: statsType) => {
  let running_spend: number;
  if (stats) {
    const total_out_transactions = parseFloat(
      stats.running_spend.total_out_transactions
    );
    const total_spend = parseFloat(stats.running_spend.total_spend);
    running_spend = total_out_transactions + total_spend;
  } else {
    redirect("/");
  }
  return (
    <>
      <table className="text-center mx-auto min-w-full">
        <thead>
          <tr>
            <td className="border-b p-2 font-bold">Running Spend</td>
            <td className="border-b border-x p-2 font-bold">Most used card</td>
            <td className="border-b p-2 font-bold">Most visited</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-t p-2">
              {Number.isNaN(running_spend) ? "..." : `£${running_spend}`}
            </td>
            <td className="border-t border-x p-2">
              {stats.most_used_card ? stats.most_used_card.card_name : "..."}
            </td>
            <td className="border-t p-2">
              {stats.most_visited ? stats.most_visited.spend_location : "..."}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
