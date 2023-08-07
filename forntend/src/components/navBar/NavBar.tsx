import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <aside className={styles.NavBar}>
      <p>Home</p>
      <p>Search</p>
      <p>Message</p>
      <p>Friends</p>
    </aside>
  );
};

export default NavBar;
