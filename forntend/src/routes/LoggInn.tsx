import { useState } from "react";
import Header from "../components/header/Header";
import cSharpAPI from "../api/axiosInstance";
import { Navigate } from "react-router-dom";

const LoggInn = () => {
  return (
    <div>
      <Header />
      <main>
        <Login />
      </main>
    </div>
  );
};

export default LoggInn;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    const response = await cSharpAPI.post("/User/LoggInn-v0", {
      email: username,
      password: password, //Impliment hash algorithm
    });
    console.log(response);

    if (response.data == "00000000-0000-0000-0000-000000000000") {
      console.log("Invalid login");
      return;
    }

    localStorage.setItem("sessionToken", response.data);
    setLoggedIn(true);
    return <Navigate to="/" />;
  };

  if (loggedIn) return <Navigate to="/" />;
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};
