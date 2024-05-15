import { CardData } from "@/utils/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CardSelectorProps {
  cards: CardData[];
  handleChange: (value: string) => void;
}
export default function CardSelector({
  cards,
  handleChange,
}: CardSelectorProps) {
  const handleCardChange = (value: string) => {
    // Convert the value to a number
    const id = parseInt(value);
    // Find the card with the matching ID
    const selectedCard = cards.find((card) => card.cid === id);
    // Pass the selected card data to the handleChange function
    if (selectedCard) {
      handleChange(JSON.stringify(selectedCard));
    }
  };
  return (
    <>
      {cards.length === 0 ? (
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Cards" />
          </SelectTrigger>
        </Select>
      ) : (
        <Select onValueChange={handleCardChange}>
          <SelectTrigger>
            <SelectValue placeholder="Cards" />
          </SelectTrigger>
          <SelectContent>
            {cards.map((card) => (
              <SelectItem key={card.cid} value={String(card.cid)}>
                {card.card_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </>
  );
}
