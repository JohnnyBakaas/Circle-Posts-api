import axios from "axios";

const cSharpAPI = axios.create({
    baseURL: "https://localhost:7166/api",
});

export default cSharpAPI;