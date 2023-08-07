import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";

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
      <h1 className={`${shrinkFont ? styles.animateFont : ""}`}>Circles</h1>
    </header>
  );
};

export default Header;
