"use client";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface LoginFormProps {
  FormHandler: (e: FormEvent<HTMLFormElement>) => void;
}

export default function LoginForm({ FormHandler }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="flex">
        <form onSubmit={FormHandler}>
          <h1 className="py-3">Login</h1>
          <div className="flex flex-col p-2 space-y-4">
            <Input type="text" name="username" placeholder="Username..." />
            <div className="space-x-2 flex flex-row">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password..."
              />
              <Button
                variant="outline"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </div>
          </div>
          <div className="m-2">
            <Button type="submit" variant="secondary">
              Log In
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
