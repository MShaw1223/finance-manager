"use client";
import { FormEvent, useState } from "react";
import LoginForm from "./loginForm";
import { useRouter } from "next/navigation";

export default function Login() {
  const [signIn, setSignIn] = useState(false);
  const router = useRouter();
  const handler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const payload = {
      username: data.get("username") as string,
      user_password: data.get("password") as string,
    };
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user_id = res.json();
    if (res.ok) {
      setSignIn(true);
      router.push(`/${user_id}`);
    }
  };
  return (
    <>
      <LoginForm FormHandler={handler} />
    </>
  );
}
