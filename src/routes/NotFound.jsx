import Title from "../components/Title";

const NotFound = () => {
  return (
    <>
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA019LFPVaDyWb_BvL1GtJASzlbKEyD4aFlt4y-LLkquInz47POpmNbEsuVv9DlppAH7E&usqp=CAU"
          alt="error 404 img"
          className="mx-auto"
        />
        <Title text="Not Found: Error 404"></Title>
        <div className="flex justify-center items-center hx-screen">
          <a href="/" className="text-blue-500 text-center">
            Vuelve al inicio
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
