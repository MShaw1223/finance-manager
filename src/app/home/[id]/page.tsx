"use client";
import { NavBar } from "@/components/navBar";
import TabBar from "@/components/tabBar";
import { Get as g } from "@/utils/helpful";
import { Params } from "@/utils/interface";
import * as t from "@/utils/types";
import { useEffect, useState } from "react";

export default function Home({ params }: Params) {
  const [data, setData] = useState<t.CardDataParamType>({
    params: { data: [], id: params.id },
  });
  const [user, setUser] = useState<t.usersData[]>([]);
  const [stats, setStats] = useState<t.statsType>({
    stats: {
      most_used_card: { card_name: "" },
      most_visited: { spend_count: "", spend_location: "" },
      running_spend: { total_out_transactions: "", total_spend: "" },
    },
  });
  useEffect(() => {
    async function get_cards() {
      const cardData = new g<t.CardData[]>(`/home/${params.id}/api/getCards`);
      const cardDataResponse = await cardData.get_array();
      const cards = cardDataResponse.array;
      const payload = {
        params: {
          data: cards,
          id: params.id,
        },
      };
      setData(payload);
    }
    async function get_user() {
      const userData = new g<t.usersData[]>(`/home/${params.id}/api/getUser`);
      const userResponse = await userData.get_array();
      const set = userResponse.array;
      setUser(set);
    }
    async function get_overview_data() {
      const overviewData = new g<t.statsType>(
        `/home/${params.id}/api/getOverviewData`
      );
      const overviewResponse = await overviewData.get_other();
      const set = overviewResponse.json;
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
