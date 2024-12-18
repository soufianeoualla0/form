import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SelectList = ({
  options,

  defaultValue,
  disabled,
  onChange,
  placeholder,
}: {
  options: {
    value: string;
    label: string;
  }[];
  defaultValue?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  placeholder: string;
}) => {
  return (
    <Select
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={(value) => onChange(value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} className="text-dark-blue" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem
            key={index}
            value={option.value}
            className="relative flex items-center justify-between"
          >
            {option.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectList;
