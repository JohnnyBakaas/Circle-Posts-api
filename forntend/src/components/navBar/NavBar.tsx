import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <aside className={styles.NavBar}>
      <p>Home</p>
      <p>Seartch</p>
      <p>Message</p>
      <p>Friens</p>
    </aside>
  );
};

export default NavBar;
