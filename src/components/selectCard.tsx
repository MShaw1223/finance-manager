import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CardSelectorProps } from "@/utils/interface";

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
          <SelectTrigger className="min-w-[100px]">
            <SelectValue placeholder="Cards" />
          </SelectTrigger>
        </Select>
      ) : (
        <Select onValueChange={handleCardChange}>
          <SelectTrigger className="min-w-[100px]">
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
