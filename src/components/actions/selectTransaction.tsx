import { CardData } from "@/utils/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectProps } from "@/utils/interface";

enum Options {
  In = "in",
  Out = "out",
}

export default function TransactionOption({ handleChange }: SelectProps) {
  const handleCardChange = (value: string) => {
    const selectedOption = value;
    // Pass the selected data to the handleChange function
    if (selectedOption) {
      handleChange(JSON.stringify(selectedOption));
    }
  };
  return (
    <Select onValueChange={handleCardChange}>
      <SelectTrigger className="min-w-[100px]">
        <SelectValue placeholder="In / Out" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(Options).map((option) => (
          <SelectItem key={option} value={option}>
            {option.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
