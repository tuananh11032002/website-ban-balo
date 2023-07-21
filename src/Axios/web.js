import axiosClient from "./axiosClient";

const END_POINT = {
  CATEGORY: "Category",
  PRODUCT: "Product",
  ORDER: "Order",
};
export const getCATEGORYAPI = () => {
  return axiosClient.get(`${END_POINT.CATEGORY}`);
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

export const AddProductIntoOrder = (idProduct, userid = 1, orderItemDto) => {
  return axiosClient.post(
    `${END_POINT.ORDER}/${END_POINT.PRODUCT}/${idProduct}`,
    orderItemDto,
    { params: { userid: userid } }
  );
};

export const GetProductIntoOrder = () => {
  return axiosClient.get(`${END_POINT.ORDER}/${END_POINT.PRODUCT}`);
};
export const GetProductSearch = (data) => {
  return axiosClient.get(`${END_POINT.PRODUCT}/Search`, { params: { data } });
};

export const DeleteProductIntoOrder = (productid) => {
  return axiosClient.delete(`${END_POINT.ORDER}`, {
    params: { productid },
  });
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
export const delCATEGORYApi = (id) => {
  return axiosClient.delete(`${END_POINT.CATEGORY}/${id}`);
};
