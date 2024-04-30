"use client";
import { FormEvent, useState } from "react";
import Login from "../components/login";
import Signup from "../components/signup";

export default function main() {
  const [isNew, setNew] = useState<boolean>(false);
  async function setter(state: boolean) {
    setNew(state);
  }
  return (
    <>
      <div>
        <nav>
          <h1>Welcome</h1>
          <button onClick={() => setter(false)}>login</button>
          <button onClick={() => setter(true)}>signup</button>
        </nav>
        <div>
          {!isNew ? <Login /> : isNew ? <Signup /> : <h1>Loading...</h1>}
        </div>
      </div>
    </>
  );
}
