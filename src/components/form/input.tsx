import { FC } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  label?: string;
  placeHolder?: string;
  type?: string;
}

const Input: FC<InputProps> = ({
  label,
  name,
  placeHolder,
  type,
  ...props
}) => {
  const { register } = useFormContext();

  return (
    <div>
      {label && <label>{label}</label>}
      {type === "textarea" ? (
        <textarea
          {...props}
          {...register(name)}
          placeholder={placeHolder}
          autoFocus
        />
      ) : (
        <input
          {...props}
          {...register(name)}
          placeholder={placeHolder}
          autoFocus
        />
      )}
    </div>
  );
};

export default Input;
