import { z } from "zod";
import FormBuilder from "./components/FormBuilder/FormBuilder";
import LoginForm from "./forms/login.form";

function App() {
  const { inputs, schema, handleSubmit } = LoginForm();

  return (
    <div className="h-screen flex justify-center items-center ">
      <FormBuilder
        defaultValues={{ username: "hhhhh", password: "" }}
        inputs={inputs}
        formSchema={schema}
        onSubmit={(data) => handleSubmit(data as z.infer<typeof schema>)}
        formClassName="w-[500px]"
        fieldsContainerClassName="grid grid-cols-2 gap-4"
      />
    </div>
  );
}

export default App;
