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
  const [selectedRecipient, setSelectedRecipient] = useState<string>();

  const handleSelection = (recipientName: string) => {
    setValue(recipientName);
    setSelectedRecipient(recipientName);
    handler(value);
    setOpen(false);
  };

  return (
    <>
      {recipients[0] ?? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
              onClick={() => setOpen(!open)}
            >
              {selectedRecipient
                ? selectedRecipient
                : `Select ${option === "in" ? "From" : "Recipient"}...`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Command value={value} onValueChange={setValue}>
              <CommandInput
                placeholder={`Select ${
                  option === "in" ? "From" : "Recipient"
                }...`}
              />
              <CommandList>
                <CommandGroup heading="Favourites">
                  <CommandEmpty>No favourites.</CommandEmpty>
                  {recipients
                    .filter((recipient) => recipient.favourite)
                    .map((recipient) => (
                      <CommandItem
                        key={recipient.recipient_name}
                        value={recipient.recipient_name}
                        onSelect={() =>
                          handleSelection(recipient.recipient_name)
                        }
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${
                            selectedRecipient === recipient.recipient_name
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                        {recipient.recipient_name}
                      </CommandItem>
                    ))}
                </CommandGroup>
                <CommandGroup heading="Others">
                  <CommandEmpty>No other recipients.</CommandEmpty>
                  {recipients
                    .filter((recipient) => !recipient.favourite)
                    .map((recipient) => (
                      <CommandItem
                        key={recipient.recipient_name}
                        value={recipient.recipient_name}
                        onSelect={() =>
                          handleSelection(recipient.recipient_name)
                        }
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${
                            selectedRecipient === recipient.recipient_name
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
      )}
    </>
  );
}
