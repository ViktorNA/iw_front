import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  // baseURL: "http://192.168.1.109:8080/api",
  // baseURL: "https://9977-196-196-54-12.eu.ngrok.io/api",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
export default instance;
