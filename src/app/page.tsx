"use client";
import { useState } from "react";
import Login from "../components/login";
import Signup from "../components/signup";
import { ModeToggle } from "@/components/ui/themeToggle";
import { Button } from "@/components/ui/button";

export default function main() {
  const [isNew, setNew] = useState<boolean>(false);
  return (
    <>
      <nav>
        <div className="p-3 text-right">
          <ModeToggle />
        </div>
      </nav>
      <div className="flex text-center">
        <div className="flex flex-col mx-auto my-auto">
          <h1>Welcome</h1>
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
