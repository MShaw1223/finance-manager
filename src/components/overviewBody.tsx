"use client";
import { URLParam, usersData } from "@/utils/types";
import { useEffect, useState } from "react";

export default function OverviewBody({ params }: URLParam) {
  const [data, setData] = useState<usersData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      console.log("In use effect, params", params);
      const user_id = params!;
      const res = await fetch("/api/overview", {
        method: "POST",
        body: JSON.stringify(user_id),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newData = await res.json();
      console.log("NewData ovb: ", newData);
      const set: usersData[] = newData.returnArray;
      console.log("set", set);
      setData(set);
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <>
      <h1>Data</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        data &&
        data.map((dat) => (
          <div key={dat.uid}>
            {dat.username}
            <br />
            {dat.email}
            <br />
            {/* {dat.user_password} */}
          </div>
        ))
      )}
    </>
  );
}
