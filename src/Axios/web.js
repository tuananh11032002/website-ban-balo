import axiosClient from "./axiosClient";
import checkAndRenewToken from "../Token/token";

const END_POINT = {
  CATEGORY: "Category",
  PRODUCT: "Product",
  ORDER: "Order",
  USER: "User",
  MESSAGE: "Message",
};
export const getCATEGORYAPI = () => {
  return axiosClient.get(`${END_POINT.CATEGORY}`);
};

export const putCategory = (category) => {
  return axiosClient.put(`${END_POINT.CATEGORY}`, category);
};
export const getProductAPI = () => {
  return axiosClient.get(`${END_POINT.PRODUCT}`);
};
export const createProductAPI = (productDto, categoryId) => {
  return axiosClient.post(`${END_POINT.PRODUCT}`, productDto, {
    params: {
      categoryId: categoryId,
    },
  });
};

export const AddProductIntoOrder = async (idProduct, orderItemDto) => {
  try {
    // Chờ cho đến khi checkAndRenewToken hoàn thành
    await checkAndRenewToken();

    // Tiếp tục với cuộc gọi axios sau khi đã cấp mới token
    const response = await axiosClient.post(
      `${END_POINT.ORDER}/${END_POINT.PRODUCT}/${idProduct}`,
      orderItemDto,
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("webbanbalo_user")).token
              .accessToken
          }`,
        },
      }
    );

    return response;
  } catch (error) {
    // Xử lý lỗi ở đây nếu có
    console.error(
      "Lỗi trong quá trình kiểm tra và cấp mới token hoặc cuộc gọi axios:",
      error
    );
    throw error; // Re-throw lỗi để cho phép code gọi AddProductIntoOrder xử lý lỗi tiếp theo nếu cần
  }
};

export const GetOrder = async () => {
  try {
    // Chờ cho đến khi checkAndRenewToken hoàn thành
    await checkAndRenewToken();

    // Tiếp tục với cuộc gọi axios sau khi đã cấp mới token
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token
      .accessToken;

    const response = await axiosClient.get(`${END_POINT.ORDER}/orderNow`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    // Xử lý lỗi ở đây nếu có
    console.error(
      "Lỗi trong quá trình kiểm tra và cấp mới token hoặc cuộc gọi axios:",
      error
    );
    throw error; // Re-throw lỗi để cho phép code gọi GetOrder xử lý lỗi tiếp theo nếu cần
  }
};

export const GetProductIntoOrder = async () => {
  // Sử dụng try-catch để xử lý lỗi trong quá trình kiểm tra và cấp mới token
  try {
    // Chờ cho đến khi checkAndRenewToken hoàn thành
    await checkAndRenewToken();

    // Tiếp tục với cuộc gọi axios sau khi đã cấp mới token
    const response = await axiosClient.get(
      `${END_POINT.ORDER}/${END_POINT.PRODUCT}`,
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("webbanbalo_user")).token
              .accessToken
          }`,
        },
      }
    );

    return response;
  } catch (error) {
    // Xử lý lỗi ở đây nếu có
    console.error(
      "Lỗi trong quá trình kiểm tra và cấp mới token hoặc cuộc gọi axios:",
      error
    );
    throw error; // Re-throw lỗi để cho phép code gọi GetProductIntoOrder xử lý lỗi tiếp theo
  }
};

export const DeleteProductIntoOrder = (productid) => {
  checkAndRenewToken();
  return axiosClient.delete(`${END_POINT.ORDER}`, {
    params: { productid },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("webbanbalo_user")).token.accessToken
      }`,
    },
  });
};
export const GetProductSearch = (data) => {
  return axiosClient.get(`${END_POINT.PRODUCT}/Search`, { params: { data } });
};
export const getProdctFromCategoryApi = (id) => {
  return axiosClient.get(`${END_POINT.CATEGORY}/${id}/product`);
};
export const getCategoryApi = (id) => {
  return axiosClient.get(`${END_POINT.CATEGORY}/${id}`);
};
export const getProductApi = (id) => {
  return axiosClient.get(`${END_POINT.PRODUCT}/${id}`);
};
export const deleteProductApi = (id) => {
  return axiosClient.delete(`${END_POINT.PRODUCT}/${id}`);
};

export const delCATEGORYApi = (id) => {
  return axiosClient.delete(`${END_POINT.CATEGORY}/${id}`);
};

export const getProductAndCategory = () => {
  return axiosClient.get(`${END_POINT.PRODUCT}/getProductAndCategory`);
};

export const getProductAndCategoryOption = (name, option) => {
  return axiosClient.get(
    `${END_POINT.PRODUCT}/getProductAndCategory/${name}/${option}`
  );
};

//Area user api
export const getUser = () => {
  return axiosClient.get(`${END_POINT.USER}`);
};

export const Login = (infor) => {
  return axiosClient.post(`${END_POINT.USER}/Login`, infor);
};
export const Register = (userInfor) => {
  console.log("register", userInfor);
  return axiosClient.post(`${END_POINT.USER}/AddUser`, { ...userInfor, id: 0 });
};
export const RenewToken = (tokenModel) => {
  return axiosClient.post(`${END_POINT.USER}/RenewToken`, tokenModel);
};

//areas message
export const getUserMessage = () => {
  checkAndRenewToken();
  return axiosClient.get(`${END_POINT.MESSAGE}/userList`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("webbanbalo_user")).token.accessToken
      }`,
    },
  });
};

export const getMessageWithUserId = (receiverId) => {
  checkAndRenewToken();
  return axiosClient.get(`${END_POINT.MESSAGE}/${receiverId}`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("webbanbalo_user")).token.accessToken
      }`,
    },
  });
};
