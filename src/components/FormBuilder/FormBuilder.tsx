import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "../../lib/utils";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { FieldType, FormFieldType, GroupFieldType } from "./Form.types";
import FormFieldWrapper from "./FormFieldWrapper";

interface FormBuilderProps {
  formSchema: z.ZodObject<any>;
  inputs: FormFieldType[];
  formClassName?: string;
  fieldsContainerClassName?: string;
}

const FormBuilder = ({
  formSchema,
  defaultValues,
  onSubmit,
  inputs,
  formClassName,
  fieldsContainerClassName,
}: FormBuilderProps & {
  defaultValues: z.infer<typeof formSchema>;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}) => {
  const [formFields, setFormFields] = useState<FormFieldType[]>([]); // State for form inputs

  // Initialize React Hook Form
  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  const { handleSubmit, control, formState } = formMethods;
  const { isValid, isDirty, isSubmitting } = formState;

  // Separate grouped and non-grouped fields
  const individualFields = formFields.filter(
    (field) => !("group" in field)
  ) as FieldType[];
  const groupFields = formFields.filter(
    (field) => "group" in field
  ) as GroupFieldType[];

  useEffect(() => {
    setFormFields(inputs); // Update form fields state when inputs change
  }, [inputs]);

  // Submit button state
  const isSubmitDisabled = !isValid || !isDirty;

  return (
    <Form {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "grid gap-4 bg-white border border-slate-100 rounded p-4",
          formClassName
        )}
      >
        {/* Render Grouped Fields */}
        {groupFields.map(({ group }) => (
          <div
            key={group.title}
            className={cn("space-y-4 p-4", group.className)}
          >
            <h3 className="text-lg font-semibold">{group.title}</h3>
            {group.description && (
              <p className="text-sm text-gray-500">{group.description}</p>
            )}
            <div className={cn("grid", fieldsContainerClassName)}>
              {group.fields.map((field) => (
                <FormFieldWrapper
                  key={field.name}
                  formField={{
                    ...field,
                    defaultValue:
                      field.defaultValue ?? defaultValues[field.name],
                  }}
                  control={control}
                  schemaShape={formSchema.shape}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Render Non-Grouped Fields */}
        <div className={cn("grid", fieldsContainerClassName)}>
          {individualFields.map((field) => (
            <FormFieldWrapper
              key={field.name}
              formField={{
                ...field,
                defaultValue: field.defaultValue ?? defaultValues[field.name],
              }}
              control={control}
              schemaShape={formSchema.shape}
            />
          ))}
        </div>

        {/* Buttons Section */}
        <div className="flex justify-end gap-4 items-center">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitDisabled || isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormBuilder;
