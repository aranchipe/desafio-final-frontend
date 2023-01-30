import axios from "axios";
import { getItem } from "../utils/storage";

const token = getItem("token");

export default axios.create({
  baseURL: "https://desafio-final.cyclic.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
