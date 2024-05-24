"use client";
import { Button } from "./ui/button";
import { MdArrowBack } from "react-icons/md";
import { ModeToggle } from "./ui/themeToggle";
import { useRouter } from "next/navigation";
import { NavbarParams } from "@/utils/interface";

export const NavBar = ({ user }: NavbarParams) => {
  const router = useRouter();
  async function logout() {
    router.push("/");
  }
  return (
    <>
      <nav className="border-b">
        <div className="flex flex-row justify-between">
          <h1 className="p-3 text-3xl">
            {user ? (user[0] ? `${user[0].username}'s Financials` : "") : ""}
          </h1>
          <div className="flex flex-row">
            {user ? (
              user[0] ? (
                <div className="p-3">
                  <Button variant="outline" onClick={() => logout()}>
                    <MdArrowBack />
                  </Button>
                </div>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            <div className="p-3">
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
