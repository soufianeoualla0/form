import {  z } from "zod"; 
import { FormFieldType } from "../components/FormBuilder/Form.types"; 
import { useState, useMemo } from "react"; 

const fieldDescription: FormFieldType = {
  name: "description",
  label: "Description",
  placeholder: "Enter your description",
  type: "textarea",
  grid: "col-span-2",
};

const loginSchema = (role: string) =>
  z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    age: z
      .number()
      .min(18, {
        message: "You must be at least 18 years old.",
      })
      .or(
        z.string().refine((val) => !isNaN(Number(val)), "Age must be a number")
      )
      .transform(Number),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    role: z
      .string()
      .nonempty({
        message: "Please select a role.",
      })
      .refine((value) => role === value, {
        message: "The selected role is invalid.",
      }),
  });

const LoginForm = () => {
  const [role, setRole] = useState<string>(""); 

  const [inputs, setInputs] = useState<FormFieldType[]>([
    {
      name: "credentials",
      group: {
        title: "Credentials",
        description: "Enter your credentials",
        className: "bg-gray-100 rounded-sm p-4",
        fields: [
          {
            name: "username",
            label: "Username",
            placeholder: "Enter your username",
            type: "text",
            grid: "col-span-1",
          },
          {
            name: "password",
            label: "Password",
            placeholder: "Enter your password",
            type: "password",
            grid: "col-span-1",
          },
        ],
      },
    },
    {
      name: "age",
      label: "Age",
      placeholder: "Enter your age",
      type: "number",
      grid: "col-span-2",
    },
    {
      name: "role",
      label: "Role",
      placeholder: "Select a role",
      type: "select",
      options: [
        { value: "1", label: "Role 1" },
        { value: "2", label: "Role 2" },
        { value: "3", label: "Role 3" },
      ],
      grid: "col-span-2",
      description: "Please select a role.",
      hooks: {
        onchange: (value) => {
          setInputs((prevInputs) => {
            const hasDescription = prevInputs.some(
              (f) => f.name === "description"
            );

            if (value === "1" && !hasDescription) {
              setRole(value);
              return [...prevInputs, fieldDescription];
            } else if (value !== "1" && hasDescription) {
              return prevInputs.filter((f) => f.name !== "description");
            }

            return prevInputs;
          });
         
        },
      },
    },
  ]);

  const schema = useMemo(() => loginSchema(role), [role]);

  const handleSubmit = (data: z.infer<typeof schema>) => {
    console.log("Form submitted:", data);
  };

  return { inputs, schema, handleSubmit };
};

export default LoginForm;
