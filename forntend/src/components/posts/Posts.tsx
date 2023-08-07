import Post, { IPost } from "../post/Post";
import styles from "./Posts.module.css";

const Posts = () => {
  const posts: IPost[] = [
    {
      avatar:
        "https://www.redwolf.in/image/catalog/stickers/woah-mama-sticker-india.jpg",
      displayName: "Jaa9 Bravo",
      handle: "Meg",
      followers: 692400,
      content:
        "En veldig spennende post om fordelne med Rust over alle andre språk og en vits om java script. Rust BTW!",
      comments: 692400,
      likes: 1233000,
      disLikes: 12,
      views: 692400,
      you: true,
      following: true,
      liked: true,
      disLiked: false,
    },
    {
      avatar:
        "https://yt3.googleusercontent.com/ytc/AOPolaQ2iMmw9cWFFjnwa13nBwtZQbl-AqGYkkiTqNaTLg=s900-c-k-c0x00ffffff-no-rj",
      displayName: "Brenner bruker",
      handle: "Brenner123",
      followers: 69,
      content: "JS er kult",
      comments: 16,
      likes: 168,
      disLikes: 69420,
      views: 70100,
      you: false,
      following: false,
      liked: false,
      disLiked: true,
    },
    {
      avatar:
        "https://www.redwolf.in/image/catalog/stickers/woah-mama-sticker-india.jpg",
      displayName: "Jaa8 Bravo",
      handle: "IkkeMeg",
      followers: 420,
      content:
        "En veldig spennende post om fordelne med Rust over alle andre språk og en vits om java script. Rust BTW!",
      comments: 2,
      likes: 135,
      disLikes: 0,
      views: 102,
      you: false,
      following: true,
      liked: false,
      disLiked: false,
    },
    {
      avatar:
        "https://www.redwolf.in/image/catalog/stickers/woah-mama-sticker-india.jpg",
      displayName: "Jaa9 Bravo",
      handle: "Meg",
      followers: 69,
      content:
        "En veldig spennende post om fordelne med Rust over alle andre språk og en vits om java script. Rust BTW!",
      comments: 2,
      likes: 100,
      disLikes: 0,
      views: 102,
      you: true,
      following: true,
      liked: false,
      disLiked: false,
    },
  ];

  return (
    <div className={styles.wrapper}>
      {posts.map((e, i) => (
        <Post data={e} key={i} />
      ))}
    </div>
  );
};

export default Posts;
