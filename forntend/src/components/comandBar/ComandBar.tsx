import styles from "./ComandBar.module.css";

const ComandBar = () => {
  return (
    <aside className={styles.bar}>
      <p>Global</p>
      <p>Friends</p>
      <p>Work</p>
      <p>Famen</p>
      <p>cRUSTaceans</p>
      <p>Meme'rs</p>
      <p>+ New Circle</p>
      <p>Edit Circles</p>
    </aside>
  );
};

export default ComandBar;
