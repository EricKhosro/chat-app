interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}
const Button = ({ text, onClick, className }: ButtonProps) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
