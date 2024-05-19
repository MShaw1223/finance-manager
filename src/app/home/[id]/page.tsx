"use client";
import { NavBar } from "@/components/navBar";
import TabBar from "@/components/tabBar";
import {
  CardData,
  CardDataParam,
  Params,
  statsType,
  usersData,
} from "@/utils/types";
import { useEffect, useState } from "react";

export default function Home({ params }: Params) {
  const [data, setData] = useState<CardDataParam>({
    params: { data: [], id: params.id },
  });
  const [user, setUser] = useState<usersData[]>([]);
  const [stats, setStats] = useState<statsType>({
    stats: {
      most_used_card: { card_name: "" },
      most_visited: { spend_count: "", spend_location: "" },
      running_spend: { total_out_transactions: "", total_spend: "" },
    },
  });
  useEffect(() => {
    async function get_cards() {
      const datResponse = await fetch(`/home/${params.id}/api/getCards`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await datResponse.json();
      const set: CardData[] = res.cardArray;
      const payload = {
        params: {
          data: set,
          id: params.id,
        },
      };
      setData(payload);
    }
    async function get_user() {
      const data = await fetch(`/home/${params.id}/api/getUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await data.json();
      const set: usersData[] = res.returnArray;
      setUser(set);
    }
    async function get_overview_data() {
      const data = await fetch(`/home/${params.id}/api/getOverviewData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await data.json();
      const set: statsType = res;
      setStats(set);
    }
    // add any other gets here then pass as another set of params
    get_cards();
    get_user();
    get_overview_data();
  }, [params.id]);
  return (
    <>
      <NavBar user={user} />
      <div className="flex">
        <TabBar params={data} stats={stats} />
      </div>
    </>
  );
}
