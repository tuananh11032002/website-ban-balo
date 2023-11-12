import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  timeout: 30000,
});

let isRequestInProgress = false;

// instance.interceptors.request.use(
//   (config) => {
//     if (isRequestInProgress) {
//       // If a request is already in progress, return the same promise
//       return Promise.reject("Request in progress");
//     }

//     isRequestInProgress = true;
//     return config;
//   },
//   (error) => {
//     isRequestInProgress = false;
//     return Promise.reject(error);
//   }
// );

instance.interceptors.response.use(
  (response) => {
    isRequestInProgress = false;
    return { status: true, result: response.data };
  },
  (error) => {
    isRequestInProgress = false;
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      console.error(error);

      if (status === 400 && data) {
        return { status: false, result: data };
      } else if (status === 404) {
        return {
          status: false,
          result: data || "Không tìm thấy trang yêu cầu",
        };
      } else if (status === 403) {
        return {
          status: false,
          result: data || "Từ chối truy cập",
        };
      } else if (status === 401) {
        return {
          status: false,
          result: data || "Tài khoản chưa được xác thực",
        };
      }
    }
  }
);

export default instance;
