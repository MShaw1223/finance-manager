"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./loginForm";

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
    if (res.ok) {
      router.push(`/home/${user_id}`);
    } else {
      alert("Unable to log in");
    }
  };
  return (
    <>
      <title>Login</title>
      <LoginForm FormHandler={handler} />
    </>
  );
}
