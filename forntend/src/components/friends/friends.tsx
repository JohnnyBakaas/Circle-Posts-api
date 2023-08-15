import Posts, { IPosts } from "../posts/Posts";
import cSharpAPI from "../../api/axiosInstance";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Friends = () => {
  const [posts, setPosts] = useState<IPosts>([]);
  const [err, setErr] = useState(false);

  const getFriendsPosts = async () => {
    try {
      const response = await cSharpAPI.put(
        "/Posts/friends-v0",
        JSON.stringify({ sessionToken: localStorage.getItem("sessionToken") }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.length) setPosts(response.data);
      else setErr(true);
      console.log(response.data);
    } catch {
      setErr(true);
    }
  };

  useEffect(() => {
    getFriendsPosts();
  }, []);

  if (err) {
    console.log("Error state is true, attempting to navigate");
    return <Navigate to="/logginn" />;
  }
  return <Posts posts={posts} />;
};

export default Friends;
