"use client";
import { CardData, Params, usersData } from "@/utils/types";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";

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
      {loading ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        <div className="p-2 m-2">
          <div className="flex">
            <div className="flex flex-row space-x-5 mx-auto">
              <div className="flex flex-col text-center">
                <h1>Running Spend</h1>
                <Separator />
                <h1>*Data*</h1>
              </div>
              <Separator orientation="vertical" />
              <div className="flex flex-col text-center">
                <h1>Most used card</h1>
                <Separator />
                <h1>*Data*</h1>
              </div>
              <Separator orientation="vertical" />
              <div className="flex flex-col text-center">
                <h1>Most recurring visits</h1>
                <Separator />
                <h1>*Data*</h1>
              </div>
            </div>
          </div>
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
