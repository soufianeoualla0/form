import SelectList from "../SelectList";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FieldType } from "./Form.types";

const RenderField = ({
    formField,
    field,
  }: {
    formField: FieldType;
    field: any;
  }) => {
    
    switch (formField.type) {
      case "text":
      case "password":
      case "number":
        return (
          <Input
            type={formField.type}
            placeholder={formField.placeholder}
            defaultValue={formField.defaultValue}
            onChange={(e) =>
              field.onChange(
                formField.type === "number"
                  ? Number(e.target.value)
                  : e.target.value
              )
            }
          />
        );
      case "textarea":
        return (
          <Textarea
            placeholder={formField.placeholder}
            defaultValue={formField.defaultValue}
            onChange={(e) => field.onChange(e.target.value)}
          />
        );
      case "select":
        if ("options" in formField) {
          return (
            <SelectList
              options={formField.options}
              placeholder={formField.placeholder}
              defaultValue={formField.defaultValue}
              disabled={formField.disabled}
              onChange={(value) => {
                field.onChange(value);
                formField.hooks?.onchange?.(value);
              }}
            />
          );
        }
        return null;
      default:
        return null;
    }
  };
export default RenderField;  