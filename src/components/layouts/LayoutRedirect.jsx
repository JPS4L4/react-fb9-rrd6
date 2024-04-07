import { Outlet, useParams } from "react-router-dom";
import { usefirestore } from "../../hooks/useFirestore";
import { useEffect, useState } from "react";
import Title from "../Title";

const LayoutRedirect = () => {
  const { nanoid } = useParams();
  const { searchData } = usefirestore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchData(nanoid).then((docSnap) => {
      if (docSnap.exists()) {
        window.location.href = docSnap.data().origin;
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <Title text="Redireccionando..." />;

  return (
    <div className="mx-auto container">
      <Outlet />
    </div>
  );
};

export default LayoutRedirect;
