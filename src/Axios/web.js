import axiosClient from "./axiosClient";

const END_POINT = {
  CATEGORY: "Category",
  PRODUCT: "Product",
  ORDER: "Order",
  USER: "User",
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

export const AddProductIntoOrder = (idProduct, orderItemDto, token) => {
  return axiosClient.post(
    `${END_POINT.ORDER}/${END_POINT.PRODUCT}/${idProduct}`,
    orderItemDto,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const GetOrder = (token) => {
  return axiosClient.get(`${END_POINT.ORDER}/orderNow`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const GetProductIntoOrder = (token) => {
  // axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return axiosClient.get(`${END_POINT.ORDER}/${END_POINT.PRODUCT}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const DeleteProductIntoOrder = (productid, token) => {
  return axiosClient.delete(`${END_POINT.ORDER}`, {
    params: { productid },
    headers: {
      Authorization: `Bearer ${token}`,
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
