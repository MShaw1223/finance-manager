"use client";
import { FormEvent } from "react";
import LoginForm from "./loginForm";
import { useRouter } from "next/navigation";

export default function Login() {
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
    const response = await res.json();
    const user_id = response.uid;
    console.log(user_id);
    if (res.ok) {
      router.push(`/${user_id}`);
    }
  };
  return (
    <>
      <LoginForm FormHandler={handler} />
    </>
  );
}
