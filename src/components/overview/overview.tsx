"use client";
import { CardData, Params, usersData } from "@/utils/types";
import { useEffect, useState } from "react";
import { OverviewTable } from "./overviewTable";

export default function Overview({ params }: Params) {
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
      <div className="p-2 m-2">
        <OverviewTable tableData={data} />
      </div>
    </>
  );
}
