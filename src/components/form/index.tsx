import { PropsWithChildren } from "react";
import {
  FormProvider,
  Mode,
  UnpackNestedValue,
  useForm,
  UseFormProps,
} from "react-hook-form";
import Input from "./input";

interface FormError {}

interface IFormProps<T> extends UseFormProps {
  onSubmit: (values: UnpackNestedValue<T>) => void;
  mode?: Mode;
  errors?: Array<FormError>;
}

function Form<T>({
  onSubmit,
  children,
  mode,
  reValidateMode = "onChange",
}: PropsWithChildren<IFormProps<T>>) {
  const methods = useForm<T>({
    mode,
    reValidateMode,
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}

Form.Input = Input;
export default Form;
