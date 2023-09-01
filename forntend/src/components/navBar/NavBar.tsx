import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <aside className={styles.NavBar}>
      <p>Search</p>
      <Link to={"/message"}>
        <p>Message</p>
      </Link>
      <p>Friends</p>
    </aside>
  );
};

export default NavBar;
