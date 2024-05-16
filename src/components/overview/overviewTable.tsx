import { usersData } from "@/utils/types";

interface tableProps {
  tableData: usersData[];
}

export const OverviewTable = ({ tableData }: tableProps) => {
  return (
    <>
      <table className="text-center mx-auto min-w-full">
        <thead>
          <tr>
            <td className="border-b p-2">Running Spend</td>
            <td className="border-b border-x p-2">Most used card</td>
            <td className="border-b p-2">Most recurring visits</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-t p-2">*Data*</td>
            <td className="border-t border-x p-2">*Data*</td>
            <td className="border-t p-2">*Data*</td>
          </tr>
        </tbody>
      </table>
      <div>
        {tableData &&
          tableData.map((data) => (
            <div key={data.uid}>
              <h1>Username: {data.username}</h1>
              <h1>Email: {data.email}</h1>
            </div>
          ))}
      </div>
    </>
  );
};
