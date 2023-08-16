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
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (name.length > 10) {
              console.log(
                "Enda ikke implimentert det som skal stoppe deg, men FYYYYYY for mange tegn"
              );
            }
          }}
        />
      </div>
      <button onClick={handleNewCicle}>Make</button>
    </div>
  );
};

export default NewCircle;
