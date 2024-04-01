import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { UserContext } from "../context/UserProvider";

export const usefirestore = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const {user} = useContext(UserContext)

  useEffect(() => {
    console.log("getdata");
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const urlRef = collection(db, "urls");
      const q = query(urlRef, where("uid", "==", `${user.uid}`));
      const querySnapshot = await getDocs(q);
      const dataDb = querySnapshot.docs.map((doc) => doc.data());
      setData(dataDb);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading };
};
