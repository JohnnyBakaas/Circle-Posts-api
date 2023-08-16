import { Link } from "react-router-dom";
import styles from "./ComandBar.module.css";
import { useEffect, useState } from "react";
import cSharpAPI from "../../api/axiosInstance";

const ComandBar = () => {
  const [circles, setCircles] = useState<circleData[]>([]);

  const GetAllCircles = async () => {
    try {
      const response = await cSharpAPI.post("/Circles/GetAllCircles-v0", {
        sessionToken: localStorage.getItem("sessionToken"),
      });
      console.log(response.data);
      setCircles(response.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    GetAllCircles();
  }, []);

  return (
    <aside className={styles.bar}>
      <Link to={"/"}>
        <p>Global</p>
      </Link>
      <Link to={"/Friends"}>
        <p>Friends</p>
      </Link>
      {circles.map((e, i) => (
        <Link to={`/circle/${e.id}`} key={i}>
          <p>{e.name}</p>
        </Link>
      ))}
      <Link to={"/newCircle"}>
        <p>+ New Circle</p>
      </Link>
      <p>Edit Circles</p>
    </aside>
  );
};

export default ComandBar;

type circleData = {
  name: string;
  id: string;
};
