import Post, { IPost } from "../post/Post";
import styles from "./Posts.module.css";

const Posts = ({ posts }: { posts: IPosts }) => {
  return (
    <div className={styles.wrapper}>
      {posts.map((e, i) => (
        <Post data={e} key={i} />
      ))}
    </div>
  );
};

export type IPosts = IPost[];

export default Posts;
