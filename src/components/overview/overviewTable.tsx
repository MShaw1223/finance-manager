import { statsType } from "@/utils/types";

export const OverviewTable = ({ stats }: statsType) => {
  return (
    <>
      <table className="text-center mx-auto min-w-full">
        <thead>
          <tr>
            <td className="border-b p-2">Running Spend</td>
            <td className="border-b border-x p-2">Most used card</td>
            <td className="border-b p-2">Most visited</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-t p-2">
              £{" "}
              {parseFloat(stats.running_spend.total_out_transactions) +
                parseFloat(stats.running_spend.total_spend)}
            </td>
            <td className="border-t border-x p-2">
              {stats.most_used_card.card_name}
            </td>
            <td className="border-t p-2">
              {stats.most_visited.spend_location}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
