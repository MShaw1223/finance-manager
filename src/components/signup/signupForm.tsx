"use client";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SignUpFormProps {
  FormHandler: (e: FormEvent<HTMLFormElement>) => void;
}

export default function SignUpForm({ FormHandler }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="flex">
        <form onSubmit={FormHandler}>
          <div className="flex flex-col p-2 space-y-4">
            <Input type="text" name="username" placeholder="Username..." />
            <div className="flex flex-row space-x-2">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password..."
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPassword(!showPassword)}
                className="min-w-[70px]"
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </div>
            <Input type="text" name="email" placeholder="Email..." />
          </div>
          <div className="m-2">
            <Button variant="secondary" type="submit">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
