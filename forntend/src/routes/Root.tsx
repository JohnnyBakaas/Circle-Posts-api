import { useEffect, useState } from "react";

import Header from "../components/header/Header";
import NavBar from "../components/navBar/NavBar";
import ComandBar from "../components/comandBar/ComandBar";
import styles from "./Root.module.css";
import { Outlet } from "react-router-dom";

function Root() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    document.documentElement.className = `${theme}-theme`;
  }, [theme]);

  return (
    <div className={styles.site}>
      <Header />
      <main className={styles.ContentWrapper}>
        <NavBar />
        <Outlet />
        <ComandBar />
      </main>
      <button
        onClick={() => {
          setTheme(theme == "light" ? "dark" : "light");
        }}
      >
        Endre farge
      </button>
    </div>
  );
}

export default Root;
