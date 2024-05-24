import { FormEvent } from "react";
import { CardData, statsType, usersData } from "./types";

interface Params {
  params: { id: number };
}

interface NavbarParams {
  user: usersData[];
}

interface CardDataParam {
  params: {
    data: CardData[];
    id: number;
  };
}

interface PageProps {
  params: CardDataParam;
}

interface tabBarProps {
  params: CardDataParam;
  stats: statsType;
}

interface CardSelectorProps {
  cards: CardData[];
  handleChange: (value: string) => void;
}

interface TabsProps {
  form: (e: FormEvent<HTMLFormElement>) => void;
  CardChange: (x: string) => void;
  data: CardData[];
  amount: string;
  setAmount: (val: string) => void;
  recipient: string;
  setRecipient: (val: string) => void;
  setOption: (val: string) => void;
  setFrom: (val: string) => void;
  from: string;
}

interface FormProps {
  FormHandler: (e: FormEvent<HTMLFormElement>) => void;
}

interface SelectProps {
  handleChange: (value: string) => void;
}

interface TileProps {
  md: {
    head: string[];
    subHead: string[][];
  };
  params: any;
}

export {
  type Params,
  type NavbarParams,
  type CardDataParam,
  type PageProps,
  type tabBarProps,
  type CardSelectorProps,
  type TabsProps,
  type FormProps,
  type SelectProps,
  type TileProps,
};
