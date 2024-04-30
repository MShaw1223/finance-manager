"use client";
import { FormEvent } from "react";

interface SignUpFormProps {
  FormHandler: (e: FormEvent<HTMLFormElement>) => void;
}

export default function SignUpForm({ FormHandler }: SignUpFormProps) {
  return (
    <>
      <div className="flex">
        <form onSubmit={FormHandler}>
          <h1>Sign Up</h1>
          <div className="flex flex-col">
            <div className="m-1 p-5">
              <input type="text" name="username" placeholder="Username..." />
            </div>
            <div className="m-1 p-5">
              <input type="text" name="password" placeholder="Password..." />
            </div>
            <div className="m-1 p-5">
              <input type="text" name="email" placeholder="Email..." />
            </div>
          </div>
          <button type="submit">SignUp</button>
        </form>
      </div>
    </>
  );
}
