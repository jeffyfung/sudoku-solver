import axios from "axios";

export const axioInstance = axios.create({
  timeout: 1000,
  headers: { Accept: "application/json", "Content-Type": "application/json;charset=UTF-8" },
});
