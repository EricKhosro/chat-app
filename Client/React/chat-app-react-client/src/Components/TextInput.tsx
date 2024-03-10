export interface TextInputProps<T> {
  name: string;
  value: string | number;
  onChange: (name: string, value: string | number) => void;
  className?: string;
  type?: "text" | "password";
  onKeyDown?: (e: React.KeyboardEvent<T>) => void;
  placeholder: string;
}

const TextInput = ({
  className,
  name,
  onChange,
  value,
  onKeyDown,
  placeholder,
  type = "text",
}: TextInputProps<HTMLInputElement>) => {
  const keydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!onKeyDown) return;
    onKeyDown(e);
  };

  return (
    <input
      placeholder={placeholder}
      type={type}
      className={`w-full border-gray-400 rounded outline-none border-2 px-2 py-1 ${className}`}
      value={value || ""}
      onChange={(e) => onChange(name, e.target.value)}
      onKeyDown={(e) => keydownHandler(e)}
    />
  );
};

export default TextInput;
