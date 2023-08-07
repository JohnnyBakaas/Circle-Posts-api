import styles from "./ComandBar.module.css";

const ComandBar = () => {
  return (
    <aside className={styles.bar}>
      <p>Global</p>
      <p>Friens</p>
      <p>Work</p>
      <p>Memers</p>
      <p>+ New Circle</p>
      <p>Edit Circles</p>
    </aside>
  );
};

export default ComandBar;
