import Post, { IPost } from "../post/Post";
import styles from "./Posts.module.css";

const Posts = () => {
  const posts: Array<IPost> = [
    {
      avatar:
        "https://www.redwolf.in/image/catalog/stickers/woah-mama-sticker-india.jpg",
      displayName: "Jaa9 Bravo",
      handle: "Meg",
      folowers: 69,
      content:
        "En veldig spennende post om fordelne med Rust over alle andre språk og en vits om java script. Rust BTW!",
      coments: 2,
      likes: 100000,
      disLikes: 0,
      views: 102,

      you: true,
      folowing: true,
      liked: false,
      disLiked: true,
    },
    {
      avatar:
        "https://www.redwolf.in/image/catalog/stickers/woah-mama-sticker-india.jpg",
      displayName: "Jaa9 Bravo",
      handle: "Meg",
      folowers: 69,
      content:
        "En veldig spennende post om fordelne med Rust over alle andre språk og en vits om java script. Rust BTW!",
      coments: 2,
      likes: 100,
      disLikes: 0,
      views: 102,

      you: true,
      folowing: true,
      liked: false,
      disLiked: true,
    },
    {
      avatar:
        "https://www.redwolf.in/image/catalog/stickers/woah-mama-sticker-india.jpg",
      displayName: "Jaa9 Bravo",
      handle: "Meg",
      folowers: 69,
      content:
        "En veldig spennende post om fordelne med Rust over alle andre språk og en vits om java script. Rust BTW!",
      coments: 2,
      likes: 100,
      disLikes: 0,
      views: 102,

      you: true,
      folowing: true,
      liked: false,
      disLiked: true,
    },
    {
      avatar:
        "https://www.redwolf.in/image/catalog/stickers/woah-mama-sticker-india.jpg",
      displayName: "Jaa9 Bravo",
      handle: "Meg",
      folowers: 69,
      content:
        "En veldig spennende post om fordelne med Rust over alle andre språk og en vits om java script. Rust BTW!",
      coments: 2,
      likes: 100,
      disLikes: 0,
      views: 102,

      you: true,
      folowing: true,
      liked: false,
      disLiked: true,
    },
  ];

  return (
    <div className={styles.wrapper}>
      {posts.map((e) => (
        <Post data={e} />
      ))}
    </div>
  );
};

export default Posts;
