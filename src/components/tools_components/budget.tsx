import { URLParam } from "@/utils/types";
import { useEffect } from "react";

export const BudgetSetter = ({ params }: URLParam) => {
  useEffect(() => {
    async function get_data() {
      const datResponse = await fetch("/api/tools_page", {});
    }
  });
  return (
    <>
      <div className="p-2 m-2 ">
        <h1>Set a budget in here</h1>
      </div>
    </>
  );
};
