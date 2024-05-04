"use client";
import TabBar from "@/components/tabBar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/themeToggle";
import { URLParam } from "@/utils/types";
import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

export default async function Overview({ params }: URLParam) {
  const router = useRouter();
  return (
    <>
      <nav>
        <div className="flex flex-row justify-between">
          <h1 className="p-3 text-3xl">Data</h1>
          <div className="flex flex-row">
            <div className="p-3">
              <Button variant="outline" onClick={() => router.push("/")}>
                <MdArrowBack />
              </Button>
            </div>
            <div className="p-3">
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
      <div className="mx-auto">
        <TabBar params={params} />
      </div>
    </>
  );
}
