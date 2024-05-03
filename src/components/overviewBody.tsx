"use client";
import { URLParam, usersData } from "@/utils/types";
import { useEffect, useState } from "react";
import { ModeToggle } from "./ui/themeToggle";
import { MdArrowBack } from "react-icons/md";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function OverviewBody({ params }: URLParam) {
  const router = useRouter();
  const [data, setData] = useState<usersData[]>([]);
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
      setData(set);
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <>
      <nav>
        <div className="flex flex-row justify-between">
          <h1 className="p-3 text-3xl">Data</h1>
          <div className="flex flex-row">
            <div className="p-3">
              <Button variant="outline" onClick={() => router.push("/")}>
                <MdArrowBack />
              </Button>
            </div>
            <div className="p-3">
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
      {loading ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        data &&
        data.map((dat) => (
          <div key={dat.uid} className="p-3 text-center">
            <h1>User id: {dat.uid}</h1>
            <h1>{dat.username}</h1>

            <h1>{dat.email}</h1>

            {/* {dat.user_password} */}
          </div>
        ))
      )}
    </>
  );
}
