import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./components/posts/Posts";
import Header from "./components/header/Header";
import NavBar from "./components/navBar/NavBar";
import ComandBar from "./components/comandBar/ComandBar";
import styles from "./App.module.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Posts />,
  },
]);

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.className = `${theme}-theme`;
  }, [theme]);

  return (
    <div className={styles.site}>
      <Header />
      <main className={styles.ContentWrapper}>
        <NavBar />
        <RouterProvider router={router} />
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

export default App;
