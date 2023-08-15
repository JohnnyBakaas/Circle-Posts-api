import Posts, { IPosts } from "../posts/Posts";
import cSharpAPI from "../../api/axiosInstance";
import { useEffect, useState } from "react";

const pretendoData: IPosts = [
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

const Global = () => {
  const [posts, setPosts] = useState<IPosts>(pretendoData);

  const getGlobalPosts = async () => {
    const response = await cSharpAPI.put(
      "/Posts/global-v0",
      JSON.stringify({
        sessionToken:
          localStorage.getItem("sessionToken") != null
            ? localStorage.getItem("sessionToken")
            : "00000000-0000-0000-0000-000000000000",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Kake bkaer");
    setPosts(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getGlobalPosts();
    console.log("Kake");
  }, []);

  return <Posts posts={posts} />;
};

export default Global;
