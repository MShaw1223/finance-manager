"use client";
import { ActionsData } from "@/utils/helpful";
import { ActionTile } from "../tiles";
import { PageProps } from "@/utils/interface";

export default function Actions({ params }: PageProps) {
  return (
    <>
      <title>Actions</title>
      <ActionTile md={ActionsData} params={params} />
    </>
  );
}
