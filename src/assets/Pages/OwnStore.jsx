import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import OwnStoreQcard from "../../Components/OwnStoreQcard";
import Qcard from "../../Components/Qcard";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../FireBase";

const OwnStore = () => {
  const { topic } = useContext(AuthContext);
  const [fdata, setfdata] = useState([]);
  useEffect(() => {
    onSnapshot(doc(db, "collection", `${topic}`), (doc) => {
      setfdata(doc.data()?.questions);
    });
  }, []);
  console.log(fdata);
  return (
    <div>
      <NavBar />
      {fdata?.map(({ title, url, level, notes, solution }) => (
        <OwnStoreQcard
          problem={title}
          URL={url}
          level={level}
          notes={notes}
          solution={solution}
        />
      ))}
    </div>
  );
};

export default OwnStore;
