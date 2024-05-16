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

interface TimeSelectProps {
  handleChange: (value: string) => void;
}

export default function SelectPeriod({ handleChange }: TimeSelectProps) {
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
