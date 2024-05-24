import { FormEvent } from "react";
import { CardData, recipientType, statsType, usersData } from "./types";

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
  recipients: recipientType[];
}

interface PageProps {
  params: CardDataParam;
}
interface ToolsActionsPageProps {
  params: CardDataParam;
  recipients: recipientType[];
}

interface tabBarProps {
  params: CardDataParam;
  stats: statsType;
  recipients: recipientType[];
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
  command: (val: string) => void;
  setOption: (val: string) => void;
  option: string;
  recipients: recipientType[];
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
  recipients: recipientType[];
}
interface ActionsTileProps {
  md: {
    head: string[];
    subHead: string[][];
  };
  params: any;
  recipients: recipientType[];
}

export {
  type Params,
  type NavbarParams,
  type CardDataParam,
  type PageProps,
  type ToolsActionsPageProps,
  type tabBarProps,
  type CardSelectorProps,
  type TabsProps,
  type FormProps,
  type SelectProps,
  type TileProps,
  type ActionsTileProps,
};
