"use client";
import { FormEvent } from "react";

interface LoginFormProps {
  FormHandler: (e: FormEvent<HTMLFormElement>) => void;
}

export default function LoginForm({ FormHandler }: LoginFormProps) {
  return (
    <>
      <div className="flex">
        <form onSubmit={FormHandler}>
          <h1>Login</h1>
          <div className="flex flex-col">
            <div className="m-10 p-10">
              <input type="text" name="username" placeholder="Username..." />
            </div>
            <div className="p-1">
              <input type="text" name="password" placeholder="Password..." />
            </div>
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </>
  );
}
