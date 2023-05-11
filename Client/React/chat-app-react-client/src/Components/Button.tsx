interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}
const Button = ({
  text,
  onClick,
  className,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`py-2 px-5 bg-purple-600 text-white rounded disabled:bg-slate-400 disabled:text-black ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
