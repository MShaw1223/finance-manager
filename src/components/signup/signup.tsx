"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import SignUpForm from "./signupForm";

export default function SignUp() {
  const router = useRouter();
  const handler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const payload = {
      username: data.get("username") as string,
      user_password: data.get("password") as string,
      email: data.get("email") as string,
    };
    if (
      payload.email !== "" ||
      payload.user_password !== "" ||
      payload.username !== ""
    ) {
      const res = await fetch("/api/signup", {
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
      }
    }
  };
  return (
    <>
      <title>Sign-up</title>
      <SignUpForm FormHandler={handler} />
    </>
  );
}
