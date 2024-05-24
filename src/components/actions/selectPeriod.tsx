import { SelectProps } from "@/utils/interface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

enum Times {
  Daily = "daily",
  Week = "weekly",
  Month = "monthly",
}

export default function SelectPeriod({ handleChange }: SelectProps) {
  const handleValChange = (value: string) => {
    handleChange(value);
  };
  return (
    <Select onValueChange={handleValChange}>
      <SelectTrigger className="min-w-[100px]">
        <SelectValue placeholder="Period" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(Times).map((time) => (
          <SelectItem key={time} value={time}>
            {time.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
