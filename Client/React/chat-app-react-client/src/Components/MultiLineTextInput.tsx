import { TextInputProps } from "./TextInput";

const MultiLineTextInput = ({
  className,
  name,
  onChange,
  value,
  onKeyDown,
  placeholder,
}: TextInputProps<HTMLTextAreaElement>) => {
  const keydownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!onKeyDown) return;
    onKeyDown(e);
  };

  return (
    <textarea
      placeholder={placeholder}
      className={`w-full border-gray-400 rounded outline-none border-2 px-2 py-1 ${className}`}
      value={value || ""}
      onChange={(e) => onChange(name, e.target.value)}
      onKeyDown={(e) => keydownHandler(e)}
    />
  );
};

export default MultiLineTextInput;
