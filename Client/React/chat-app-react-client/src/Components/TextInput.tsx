interface TextInputProps {
  name: string;
  value: string | number;
  onChange: (name: string, value: string | number) => void;
  className?: string;
  type?: "text" | "password";
}

const TextInput = ({
  className,
  name,
  onChange,
  value,
  type = "text",
}: TextInputProps) => {
  return (
    <input
      type={type}
      className={`w-full border-gray-400 rounded outline-none border-2 px-2 py-1 ${className}`}
      value={value || ""}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );
};

export default TextInput;
