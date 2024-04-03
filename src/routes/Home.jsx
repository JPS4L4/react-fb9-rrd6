import { useEffect, useState } from "react";
import Title from "../components/Title";
import { usefirestore } from "../hooks/useFirestore";
import Button from "../components/Button";

const Home = () => {
  const { data, error, loading, getData, addData, deleteData, updateData } =
    usefirestore();
  const [text, setText] = useState("");
  const [newOriginID, setNewOriginID] = useState();

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return false;

    if (newOriginID) {
      await updateData(newOriginID, text);
      setNewOriginID("");
      setText("");
      return;
    }

    await addData(text);
    setText("");
  };

  const handleDelete = async (nanoid) => {
    await deleteData(nanoid);
  };

  const handleEdit = (item) => {
    setText(item.origin);
    setNewOriginID(item.nanoid);
  };

  if (loading.getData) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Title text="Home" />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ex: http://github.com"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {newOriginID ? (
          <Button
            text="Edit URL"
            type="submit"
            color="yellow"
            loading={loading.updateData}
          />
        ) : (
          <Button
            text="Add URL"
            type="submit"
            color="blue"
            loading={loading.addData}
          />
        )}
      </form>

      {data.map((item) => (
        <div key={item.nanoid}>
          <p>{item.nanoid}</p>
          <p>{item.origin}</p>
          <p>{item.uid}</p>
          <Button
            text="Delete"
            type="button"
            color="red"
            loading={loading[item.nanoid]}
            onclick={() => handleDelete(item.nanoid)}
          />
          <Button
            text="Edit"
            type="button"
            color="yellow"
            onclick={() => handleEdit(item)}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;
