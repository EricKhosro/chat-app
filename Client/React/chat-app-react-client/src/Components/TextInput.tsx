interface TextInputProps {
  name: string;
  value: string | number;
  onChange: (name: string, value: string | number) => void;
  className?: string;
  type?: "text" | "password";
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  className,
  name,
  onChange,
  value,
  onKeyDown,
  type = "text",
}: TextInputProps) => {
  const keydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!onKeyDown) return;
    onKeyDown(e);
  };

  return (
    <input
      type={type}
      className={`w-full border-gray-400 rounded outline-none border-2 px-2 py-1 ${className}`}
      value={value || ""}
      onChange={(e) => onChange(name, e.target.value)}
      onKeyDown={(e) => keydownHandler(e)}
    />
  );
};

export default TextInput;
