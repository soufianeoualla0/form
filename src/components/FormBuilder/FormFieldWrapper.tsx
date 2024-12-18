import { cn } from "../../lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FieldType } from "./Form.types";
import RenderField from "./RenderField";

const isFieldRequired = (fieldSchema: any) =>
  !fieldSchema.isOptional() && !fieldSchema.isNullable();

const FormFieldWrapper = ({
  formField,
  control,
  schemaShape,
}: {
  formField: FieldType;
  className?: string;
  control: any;
  schemaShape: any;
}) => {
  const fieldSchema = schemaShape[formField.name];
  return (
    <FormField
      key={formField.name}
      control={control}
      name={formField.name}
      render={({ field }) => (
        <FormItem className={cn("", formField.grid)}>
          <FormLabel>
            {formField.label}
            {isFieldRequired(fieldSchema) && (
              <span className="text-red-500"> *</span>
            )}
          </FormLabel>
          <FormControl>
            <RenderField formField={formField} field={field} />
          </FormControl>
          <FormDescription>{formField.description}</FormDescription>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

export default FormFieldWrapper;
