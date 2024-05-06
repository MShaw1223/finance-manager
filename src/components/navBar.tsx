"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { MdArrowBack } from "react-icons/md";
import { ModeToggle } from "./ui/themeToggle";
import { URLParam } from "@/utils/types";
import { useEffect, useState } from "react";

export const NavBar = ({ params }: URLParam) => {
  const [data, setData] = useState<string>("");
  useEffect(() => {
    async function get_data() {
      const user_id = params!;
      const res = await fetch("/api/nav_bar", {
        method: "POST",
        body: JSON.stringify(user_id),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newData = await res.json();
      const set = newData.user;
      setData(set);
    }
    get_data();
  }, []);
  return (
    <>
      <nav>
        <div className="flex flex-row justify-between">
          <h1 className="p-3 text-3xl">{data ? `${data}'s Financials` : ""}</h1>
          <div className="flex flex-row">
            {data ? (
              <div className="p-3">
                <Button variant="outline">
                  <Link href={"/"}>
                    <MdArrowBack />
                  </Link>
                </Button>
              </div>
            ) : (
              <></>
            )}
            <div className="p-3">
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
