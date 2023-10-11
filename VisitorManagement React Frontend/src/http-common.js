import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:7252",
  headers: {
    "Content-type": "application/json"
  }
});