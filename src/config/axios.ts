import axios from "axios";
import { baseUrl } from "@/config";

axios.defaults.baseURL = baseUrl;

axios.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
