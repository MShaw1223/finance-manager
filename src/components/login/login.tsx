"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./loginForm";
import { Post as p } from "@/utils/helpful";
import { toast } from "../ui/use-toast";

export default function Login() {
  const router = useRouter();
  const handler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const payload: { [key: string]: string } = {
      username: data.get("username") as string,
      user_password: data.get("password") as string,
    };
    const login = new p<{ uid: number }>("/api/login", JSON.stringify(payload));
    const response = await login.fetch_post();
    const { uid } = response.json;
    if (response.status === 200) {
      router.push(`/home/${uid}`);
    } else {
      toast({
        title: "Unable to log in",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <title>Login</title>
      <LoginForm FormHandler={handler} />
    </>
  );
}
