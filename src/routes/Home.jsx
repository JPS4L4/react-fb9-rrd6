import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usefirestore } from "../hooks/useFirestore";
import { fbErrors } from "../utils/fbErrors";
import Title from "../components/Title";
import Button from "../components/Button";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";

const Home = () => {
  const { data, error, loading, getData, addData, deleteData, updateData } =
    usefirestore();
  const [newOriginID, setNewOriginID] = useState();
  const [copy, setCopy] = useState({});

  document.title = "Inicio";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    resetField,
  } = useForm();

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async ({ url }) => {
    if (!url.trim()) return false;
    try {
      if (newOriginID) {
        await updateData(newOriginID, url);
        setNewOriginID("");
      } else {
        await addData(url);
      }
      resetField("url");
    } catch (error) {
      const { code, message } = fbErrors[error.code];
      setError(code, { message });
    }
  };

  const handleDelete = async (nanoid) => {
    await deleteData(nanoid);
  };

  const handleEdit = (item) => {
    setValue("url", item.origin);
    setNewOriginID(item.nanoid);
  };

  const handleCancel = () => {
    try {
      setNewOriginID("");
      resetField("url");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopy = async (item) => {
    await navigator.clipboard.writeText(window.location.href + item.nanoid);
    setCopy({ [item.nanoid]: true });
  };

  const pathURL = window.location.href;

  if (loading.getData) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          placeholder="https://www.google.com"
          {...register("url", {
            required: {
              value: true,
              message: "Campo Obligatorio",
            },
            pattern: {
              value:
                /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
              message: "Formato URL incorrecto",
            },
          })}
          label="Ingresa una URL"
          error={errors.url}
        >
          <FormError error={errors.url} />
        </FormInput>
        <div className="flex justify-center items-center">
          {newOriginID ? (
            <div>
              <Button
                text="Edit URL"
                type="submit"
                style="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                loading={loading.updateData}
              />
              <Button
                text="x"
                type="button"
                style="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onclick={() => handleCancel()}
              />
            </div>
          ) : (
            <Button
              text="Add URL"
              type="submit"
              style="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              loading={loading.addData}
            />
          )}
        </div>
      </form>

      {data.map((item) => (
        <div
          key={item.nanoid}
          className=" p-6 bg-white border border-gray-200 rounded-lg shadow mt-2 dark:bg-gray-800 dark:border-gray-700 "
        >
          <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pathURL}
            {item.nanoid}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item.origin}
          </p>
          <Button
            text="Delete"
            type="button"
            style="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            loading={loading[item.nanoid]}
            onclick={() => handleDelete(item.nanoid)}
          />
          <Button
            text="Edit"
            type="button"
            style="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            onclick={() => handleEdit(item)}
          />
          <Button
            text={copy[item.nanoid] ? "Copied!" : "Copy"}
            type="button"
            style="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-green-900"
            onclick={() => handleCopy(item)}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;
