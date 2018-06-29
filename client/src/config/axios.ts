import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

axios.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
