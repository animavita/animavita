import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export default client;
