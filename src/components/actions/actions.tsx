"use client";
import { ActionsData } from "@/utils/helpful";
import { ActionTile } from "../tiles";
import { ToolsActionsPageProps } from "@/utils/interface";

export default function Actions({ params, recipients }: ToolsActionsPageProps) {
  return (
    <>
      <title>Actions</title>
      <ActionTile md={ActionsData} params={params} recipients={recipients} />
    </>
  );
}
