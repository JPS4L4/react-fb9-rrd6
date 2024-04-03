import ButtonLoading from "./ButtonLoading.jsx";

const Button = ({ text, type, color = "green", loading, onclick }) => {
  if (loading) return <ButtonLoading />;

  return (
    <button
      type={type}
      className={`text-white bg-${color}-700 hover:bg-${color}-800 focus:outline-none focus:ring-4 focus:ring-${color}-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800`}
      onClick={onclick}
    >
      {text}
    </button>
  );
};

export default Button;
