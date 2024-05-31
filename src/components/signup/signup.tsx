"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import SignUpForm from "./signupForm";
import { Post as p } from "@/utils/helpful";
import { toast } from "../ui/use-toast";

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
      const signup = new p<{ uid: number }>(
        "/api/signup",
        JSON.stringify(payload)
      );
      const response = await signup.fetch_post();
      const user_id = response.json.uid;
      if (response.status === 200) {
        router.push(`/home/${user_id}`);
      } else if (response.status === 403) {
        toast({
          title: "User already exists",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Unable to log in",
          variant: "destructive",
        });
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
