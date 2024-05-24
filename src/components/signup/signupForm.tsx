"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormProps } from "@/utils/interface";

export default function SignUpForm({ FormHandler }: FormProps) {
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
