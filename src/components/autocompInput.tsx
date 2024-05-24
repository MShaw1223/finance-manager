import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { recipientType } from "@/utils/types";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";

// rewrite of radix vue combobox

export default function AutoInput({
  recipients,
  handler,
  option,
}: {
  recipients: recipientType[];
  handler: (x: string) => void;
  option: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const selectedRecipient = recipients.find(
    (recipient) => recipient.recipient_name === value
  );
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="min-w-[190px] justify-between"
            onClick={() => setOpen(!open)}
          >
            {selectedRecipient
              ? selectedRecipient.recipient_name
              : `Select ${option === "in" ? "From" : "Recipient"}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command v-model="value">
            <CommandInput
              placeholder={`Select ${
                option === "in" ? "From" : "Recipient"
              }...`}
            />
            <CommandEmpty>No recipients.</CommandEmpty>
            <CommandList>
              <CommandGroup heading="Favourites">
                {recipients
                  .filter((recipient) => recipient.favourite)
                  .map((recipient) => (
                    <CommandItem
                      key={recipient.rid}
                      value={String(recipient.rid)}
                      onSelect={() => {
                        handler(value);
                        setValue(recipient.recipient_name);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          value === recipient.recipient_name
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                      {recipient.recipient_name}
                    </CommandItem>
                  ))}
              </CommandGroup>
              <CommandGroup heading="Others">
                {recipients
                  .filter((recipient) => !recipient.favourite)
                  .map((recipient) => (
                    <CommandItem
                      key={recipient.rid}
                      value={String(recipient.rid)}
                      onSelect={() => {
                        handler(value);
                        setValue(recipient.recipient_name);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          value === recipient.recipient_name
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                      {recipient.recipient_name}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
