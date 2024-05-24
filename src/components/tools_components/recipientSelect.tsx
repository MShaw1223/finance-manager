import { recipientType } from "@/utils/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function RecipientSelector({
  setter,
  recipients,
}: {
  setter: (x: string) => void;
  recipients: recipientType[];
}) {
  const handleCardChange = (value: string) => {
    setter(value);
  };
  return (
    <>
      <Select onValueChange={handleCardChange}>
        <SelectTrigger>
          <SelectValue placeholder="FooBar" />
        </SelectTrigger>
        <SelectContent>
          {recipients &&
            recipients
              .filter((recipient) => !recipient.favourite)
              .map((recipient) => (
                <SelectItem key={recipient.rid} value={String(recipient.rid)}>
                  {recipient.recipient_name}
                </SelectItem>
              ))}
        </SelectContent>
      </Select>
    </>
  );
}
