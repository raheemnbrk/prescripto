import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

interface FilterSelectProps {
  value: string;
  placeholder: string;
  options: Option[];
  onChange: (value: string) => void;
  width?: string;
}

export default function FilterSelect({
  value,
  placeholder,
  options,
  onChange,
  width = "md:w-48",
}: FilterSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={`w-full ${width} border-indigo-200 focus:ring-main/30 cursor-pointer py-5 rounded-md`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent sideOffset={8}>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
