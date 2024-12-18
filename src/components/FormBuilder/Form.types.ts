type InputType = "text" | "password" | "number" | "textarea" | "select";

// Base Field Type
type BaseFieldType = {
  grid: string;
  name: string;
  label: string;
  placeholder: string;
  type: InputType;
  disabled?: boolean;
  defaultValue?: string;
  description?: string;
  hooks?: {
    onchange?: (value: unknown) => void;
  };
};

// Select Field Type (extends BaseFieldType)
type SelectFieldType = BaseFieldType & {
  type: "select";
  options: { value: string; label: string }[];
};

// Single Field Type
export type FieldType = BaseFieldType | SelectFieldType;

// Group Field Type
export type GroupFieldType = {
  name: string;
  group: {
    title: string;
    description?: string;
    fields: FieldType[]; // Fields that belong to the group
    className?: string;
  };
};

// Combined Field Type (Single Field or Group)
type FormFieldType = FieldType | GroupFieldType;

export type { FormFieldType };
