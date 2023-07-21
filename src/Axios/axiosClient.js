import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  timeout: 5000,
});
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error(error);
  }
);
export default instance;
