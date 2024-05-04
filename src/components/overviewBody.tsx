"use client";
import { URLParam, usersData } from "@/utils/types";
import { useEffect, useState } from "react";
import FileRd from "./fileRead";

export default function OverviewBody({ params }: URLParam) {
  // const [data, setData] = useState<usersData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      const user_id = params!;
      const res = await fetch("/api/overview", {
        method: "POST",
        body: JSON.stringify(user_id),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newData = await res.json();
      const set: usersData[] = newData.returnArray;
      // setData(set);
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <>
      {loading ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        <div className="p-3 text-center">
          <div className="p-2 m-2">
            <FileRd />
          </div>
        </div>
      )}
    </>
  );
}
