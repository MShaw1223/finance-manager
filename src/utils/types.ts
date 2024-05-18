export type usersData = {
  uid: number;
  username: string;
  email: string;
};

export type Params = {
  params: { id: number };
};

export type CardDataParam = {
  params: {
    data: CardData[];
    id: number;
  };
};

export type CardData = {
  cid: number;
  card_name: string;
};

export type NavbarParams = {
  user: usersData[];
};

export type statsType = {
  stats: {
    running_spend: { running_spend: string };
    most_visited: { spend_count: string; spend_location: string };
    most_used_card: { card_name: string };
  };
};
