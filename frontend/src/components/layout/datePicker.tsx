"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../../@/components/ui/calendar";
import { Field } from "../../../@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../../../@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../@/components/ui/popover";

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) return false;
  return !isNaN(date.getTime());
}

function parseLocalDate(val?: string) {
  if (!val) return undefined;
  const [year, month, day] = val.split("-").map(Number);
  return new Date(year, month - 1, day);
}

interface DatePickerInputProps {
  value?: string;
  onChange: (date: Date | undefined) => void;
  label?: string;
}

export function DatePickerInput({ value, onChange }: DatePickerInputProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    parseLocalDate(value),
  );
  const [month, setMonth] = React.useState<Date | undefined>(
    parseLocalDate(value),
  );
  const [inputValue, setInputValue] = React.useState(
    formatDate(parseLocalDate(value)),
  );

  React.useEffect(() => {
    if (!value) {
      setDate(undefined);
      setMonth(undefined);
      setInputValue("");
      return;
    }
    const newDate = parseLocalDate(value);
    setDate(newDate);
    setMonth(newDate);
    setInputValue(formatDate(newDate));
  }, [value]);

  return (
    <Field className="w-full md:w-60">
      <InputGroup>
        <InputGroupInput
          value={inputValue}
          placeholder="Select date"
          onChange={(e) => {
            const val = e.target.value;
            setInputValue(val);
            const parsed = new Date(val);
            if (isValidDate(parsed)) {
              setDate(parsed);
              setMonth(parsed);
              onChange(parsed);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <InputGroupButton
                variant="ghost"
                size="icon-xs"
                aria-label="Select date"
                className="cursor-pointer"
              >
                <CalendarIcon className="w-4 h-4" />
              </InputGroupButton>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end" sideOffset={10}>
              <Calendar
                mode="single"
                selected={date}
                month={month}
                onMonthChange={setMonth}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  setInputValue(formatDate(selectedDate));
                  setOpen(false);
                  onChange(selectedDate);
                }}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
