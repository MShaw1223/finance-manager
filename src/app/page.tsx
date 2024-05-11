"use client";
import { useState } from "react";
import Login from "../components/login/login";
import Signup from "../components/signup/signup";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/navBar";
import { Params } from "@/utils/types";

export default function main({ params }: Params) {
  const [isNew, setNew] = useState<boolean>(false);
  return (
    <>
      <NavBar params={params} />
      <div className="flex mt-28 text-center p-3">
        <div className="flex flex-col mx-auto my-auto">
          <div className="flex-row space-x-2 p-3">
            <Button
              variant="ghost"
              onClick={() => setNew(false)}
              className={
                !isNew
                  ? "underline underline-offset-[13px] hover:no-underline"
                  : ""
              }
            >
              Log In
            </Button>
            <Button
              variant="ghost"
              onClick={() => setNew(true)}
              className={
                isNew
                  ? "underline underline-offset-[13px] hover:no-underline"
                  : ""
              }
            >
              Sign Up
            </Button>
          </div>
          <div className="m-2 p-2 border border-input rounded-md">
            {!isNew ? <Login /> : <Signup />}
          </div>
        </div>
      </div>
    </>
  );
}
