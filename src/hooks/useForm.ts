import { ChangeEvent, useEffect, useState } from "react";

type MessageInputs = {
  message?: string;
  image?: File;
};

type LoginInputs = {
  email?: string;
  password?: string;
};

type CreateInputs = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

type ResetInputs = {
  email?: string;
};

type Inputs = MessageInputs & LoginInputs & CreateInputs & ResetInputs;

type InputTypes = {
  name: string;
  type: string;
  value: string | number | File;
};

function useForm(initial: Inputs) {
  const [inputs, setInputs] = useState<Inputs>(initial);
  const initialValues = Object.values(initial).join("");

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  function handleChange(event: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>) {
    let { name, type, value }: InputTypes = event.target;

    if (type === "number") {
      value = parseInt(value);
    }

    if (type === "file") {
      value = event.target.files[0];
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(Object.entries(inputs).map(([key]) => [key, ""])) as unknown;

    setInputs(blankState as Inputs);
  }

  return { inputs, handleChange, resetForm, clearForm };
}

export default useForm;
