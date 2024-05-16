"use client";
import { CardData, Params, usersData } from "@/utils/types";
import { useEffect, useState } from "react";
import { OverviewTable } from "./overviewTable";

export default function Overview({ params }: Params) {
  const [data, setData] = useState<usersData[]>([]);
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
    }
    get_users();
  }, []);
  return (
    <>
      <title>Overview</title>
      <OverviewTable tableData={data} />
    </>
  );
}
