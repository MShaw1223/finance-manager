type usersData = {
  uid: number;
  username: string;
  email: string;
};

type CardData = {
  cid: number;
  card_name: string;
};

type CardDataParamType = {
  params: {
    data: CardData[];
    id: number;
  };
};

type statsType = {
  stats: {
    running_spend: { total_out_transactions: string; total_spend: string };
    most_visited: { spend_count: string; spend_location: string };
    most_used_card: { card_name: string };
  };
};

type recipientType = {
  rid: number;
  recipient_name: string;
  favourite: boolean;
};

export {
  type usersData,
  type CardData,
  type CardDataParamType,
  type statsType,
  type recipientType,
};
