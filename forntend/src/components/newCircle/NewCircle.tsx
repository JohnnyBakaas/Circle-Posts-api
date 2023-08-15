import { useState } from "react";
import cSharpAPI from "../../api/axiosInstance";

const NewCircle = () => {
  const [name, setName] = useState("");

  const handleNewCicle = async () => {
    try {
      const response = await cSharpAPI.post("/Circles/MakeNewCircles-v0", {
        name: name,
        sessionToken: localStorage.getItem("sessionToken"),
        handles: null,
      });
      console.log(response.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div>
      <h2>Make a new Circle</h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button onClick={handleNewCicle}>Make</button>
    </div>
  );
};

export default NewCircle;

/*
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
  */
