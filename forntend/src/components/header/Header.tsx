import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [shrinkFont, setShrinkFont] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setShrinkFont(true);
      } else {
        setShrinkFont(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${styles.header} ${shrinkFont ? styles.shrinkFont : ""}`}
    >
      <Link to={"/"}>
        <h1 className={`${shrinkFont ? styles.animateFont : ""}`}>Circles</h1>
      </Link>
    </header>
  );
};

export default Header;
