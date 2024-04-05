import ButtonLoading from "./ButtonLoading.jsx";

const Button = ({ text, type, style, loading, onclick }) => {
  if (loading) return <ButtonLoading />;

  return (
    <button
      type={type}
      className={style}
      onClick={onclick}
    >
      {text}
    </button>
  );
};

export default Button;
