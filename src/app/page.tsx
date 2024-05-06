"use client";
import { useState } from "react";
import Login from "../components/login";
import Signup from "../components/signup";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/navBar";
import { URLParam } from "@/utils/types";

export default function main({ params }: URLParam) {
  const [isNew, setNew] = useState<boolean>(false);
  return (
    <>
      <NavBar params={params} />
      <div className="flex text-center">
        <div className="flex flex-col mx-auto my-auto">
          <div className="flex-row mx-auto space-x-2">
            <Button variant="secondary" onClick={() => setNew(false)}>
              login
            </Button>
            <Button variant="secondary" onClick={() => setNew(true)}>
              sign up
            </Button>
          </div>
          <div>
            {!isNew ? <Login /> : isNew ? <Signup /> : <h1>Loading...</h1>}
          </div>
        </div>
      </div>
    </>
  );
}
