"use client";
import { CardData, Params, usersData } from "@/utils/types";
import { useEffect, useState } from "react";

export default function OverviewBody({ params }: Params) {
  const [data, setData] = useState<usersData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function get_users() {
      const res = await fetch(`/home/${params.id}/api`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newData = await res.json();
      const set: usersData[] = newData.returnArray;
      setData(set);
      setLoading(false);
    }
    get_users();
  }, []);
  return (
    <>
      <title>Overview</title>
      {loading ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        <div className="p-2 m-2">
          <table className="text-center">
            <tr>
              <td className="border-b p-2">Running Spend</td>
              <td className="border-b border-x p-2">Most used card</td>
              <td className="border-b p-2">Most recurring visits</td>
            </tr>
            <tr>
              <td className="border-t p-2">*Data*</td>
              <td className="border-t border-x p-2">*Data*</td>
              <td className="border-t p-2">*Data*</td>
            </tr>
          </table>
          <div>
            {data ? (
              data.map((data) => (
                <div key={data.uid}>
                  <h1>Username: {data.username}</h1>
                  <h1>Email: {data.email}</h1>
                </div>
              ))
            ) : (
              <>
                <h1>No data</h1>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
