import axiosClient from './axiosClient';
import checkAndRenewToken from '../Token/token';

const END_POINT = {
   CATEGORY: 'Category',
   PRODUCT: 'Product',
   ORDER: 'Order',
   USER: 'User',
   MESSAGE: 'Message',
   REVIEW: 'Review',
};
export const getCategoryApi = () => {
   return axiosClient.get(`${END_POINT.CATEGORY}`);
};

export const getCategoryApiForAdmin = () => {
   return axiosClient.get(`${END_POINT.CATEGORY}/admin`);
};
export const createCategoryApi = (category) => {
   return axiosClient.post(`${END_POINT.CATEGORY}`, category, {
      headers: {
         'Content-Type': 'multipart/form-data',
      },
   });
};
export const putCategory = (category) => {
   return axiosClient.put(`${END_POINT.CATEGORY}`, category, {
      headers: {
         'Content-Type': 'multipart/form-data',
      },
   });
};
export const deleteCategoryApi = (categoryId) => {
   return axiosClient.delete(`${END_POINT.CATEGORY}/${categoryId}`, {
      headers: {
         'Content-Type': 'json/text',
      },
   });
};

export const getProductApiWithNameCategory = async (
   categoryId = -1,
   search = '',
   orderBy = '',

   pageSize = 10,
   pageIndex = 1
) => {
   return await axiosClient.get(`${END_POINT.PRODUCT}/get-with-category`, {
      params: {
         categoryId,
         search,
         orderBy,
         pageSize,
         pageIndex,
      },
   });
};

export const getProductApi = (
   search,
   orderBy,
   categoryId,
   stock,
   status,
   page,
   pageSize
) => {
   return axiosClient.get(`${END_POINT.PRODUCT}`, {
      params: {
         search,
         orderBy,
         categoryId,
         stock,
         status,
         page,
         pageSize,
      },
   });
};

export const getProductApiById = (id) => {
   return axiosClient.get(`${END_POINT.PRODUCT}/${id}`);
};
export const deleteProductApi = (id) => {
   return axiosClient.delete(`${END_POINT.PRODUCT}/${id}`);
};

export const createProductAPI = (productDto) => {
   return axiosClient.post(
      `${END_POINT.PRODUCT}/create-product-with-images`,
      productDto,
      {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
   );
};

export const updateProductAPI = async (productId, productInput) => {
   console.log(productInput);
   return await axiosClient.put(
      `${END_POINT.PRODUCT}/update/${productId}`,
      productInput,
      {
         headers: {
            'Content-Type': 'multipart/form-data',
            // Authorization: `Bearer ${yourAccessToken}`,
         },
      }
   );
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
                  JSON.parse(localStorage.getItem('webbanbalo_user')).token
                     .accessToken
               }`,
            },
         }
      );

      return response;
   } catch (error) {
      // Xử lý lỗi ở đây nếu có
      console.error(
         'Lỗi trong quá trình kiểm tra và cấp mới token hoặc cuộc gọi axios:',
         error
      );
      throw error;
   }
};
export const ChangeStockApi = async (stock, productId) => {
   console.log('stock', stock);
   return await axiosClient.post(
      `${END_POINT.PRODUCT}/changeStock/${productId}?stock=${stock}`
   );
};

export const GetOrderAdminApi = async (search, pageIndex, pageSize) => {
   try {
      await checkAndRenewToken();

      const token = JSON.parse(localStorage.getItem('webbanbalo_user')).token
         .accessToken;

      const response = await axiosClient.get(
         `${END_POINT.ORDER}?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );

      return response;
   } catch (error) {
      console.error(
         'Lỗi trong quá trình kiểm tra và cấp mới token hoặc cuộc gọi axios:',
         error
      );
      throw error;
   }
};
export const GetOrder = async () => {
   try {
      await checkAndRenewToken();

      const token = JSON.parse(localStorage.getItem('webbanbalo_user')).token
         .accessToken;

      const response = await axiosClient.get(`${END_POINT.ORDER}/orderNow`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });

      return response;
   } catch (error) {
      console.error(
         'Lỗi trong quá trình kiểm tra và cấp mới token hoặc cuộc gọi axios:',
         error
      );
      throw error;
   }
};
export const ConfirmOrder = async (order) => {
   try {
      console.log(order, 'data');
      await checkAndRenewToken();

      const token = JSON.parse(localStorage.getItem('webbanbalo_user')).token
         .accessToken;

      const response = await axiosClient.put(
         `${END_POINT.ORDER}/payments`,
         order,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );

      return response;
   } catch (error) {
      console.error(
         'Lỗi trong quá trình kiểm tra và cấp mới token hoặc cuộc gọi axios:',
         error
      );
      throw error;
   }
};

export const DeleteProductIntoOrder = async (productid) => {
   await checkAndRenewToken();
   return await axiosClient.delete(`${END_POINT.ORDER}`, {
      params: { productid },
      headers: {
         Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('webbanbalo_user')).token
               .accessToken
         }`,
      },
   });
};

export const GetOrderDone = async ({ pageNow, pageSize }) => {
   try {
      await checkAndRenewToken();

      const response = await axiosClient.get(
         `${END_POINT.ORDER}/${END_POINT.PRODUCT}/Done?pageSize=${pageSize}&pageIndex=${pageNow}`,
         {
            headers: {
               Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem('webbanbalo_user')).token
                     .accessToken
               }`,
            },
         }
      );

      return response;
   } catch (error) {
      // Xử lý lỗi ở đây nếu có
      console.error(
         'Lỗi trong quá trình kiểm tra và cấp mới token hoặc cuộc gọi axios:',
         error
      );
      throw error; // Re-throw lỗi để cho phép code gọi GetProductIntoOrder xử lý lỗi tiếp theo
   }
};

export const GetOrderDetailAndCustomerInfo = async (orderId) => {
   return axiosClient.get(`${END_POINT.ORDER}/${orderId}`);
};
export const UpdateStatusOrder = async (orderId) => {
   return axiosClient.put(`${END_POINT.ORDER}/${orderId}`);
};

export const getProdctFromCategoryApi = (id) => {
   return axiosClient.get(`${END_POINT.CATEGORY}/${id}/product`);
};
export const getCategoryApiById = (id) => {
   return axiosClient.get(`${END_POINT.CATEGORY}/${id}`);
};

export const delCATEGORYApi = (id) => {
   return axiosClient.delete(`${END_POINT.CATEGORY}/${id}`);
};

//Area user api
export const getUser = (search, pageIndex, pageSize, userRole, userStatus) => {
   return axiosClient.get(
      `${END_POINT.USER}?search=${search}&pageSize=${pageSize}&pageIndex=${pageIndex}&userRole=${userRole}&userStatus=${userStatus}`
   );
};
export const getUserWithId = (userId) => {
   return axiosClient.get(`${END_POINT.USER}/${userId}`);
};
export const updateUserInfo = (infor) => {
   return axiosClient.put(`${END_POINT.USER}`, infor, {
      headers: {
         'Content-Type': 'multipart/form-data',
         // Authorization: `Bearer ${yourAccessToken}`,
      },
   });
};

export const updateUserInfoforAdmin = (infor) => {
   return axiosClient.put(`${END_POINT.USER}/for-admin`, infor, {
      headers: {
         // Authorization: `Bearer ${yourAccessToken}`,
      },
   });
};
export const insertUserforAdmin = (infor) => {
   return axiosClient.post(`${END_POINT.USER}/add-user-for-admin`, infor, {
      headers: {
         // Authorization: `Bearer ${yourAccessToken}`,
      },
   });
};
export const deleteUser = (userId) => {
   return axiosClient.delete(`${END_POINT.USER}/${userId}`);
};

export const Login = (infor) => {
   return axiosClient.post(`${END_POINT.USER}/Login`, infor);
};
export const Register = async (userInfor) => {
   return await axiosClient.post(`${END_POINT.USER}/AddUser`, {
      ...userInfor,
      id: 0,
   });
};
export const RenewToken = async (tokenModel) => {
   const data = await axiosClient.post(
      `${END_POINT.USER}/RenewToken`,
      tokenModel
   );
   return data;
};

export const getCustomerApi = async (search, pageIndex, pageSize) => {
   console.log('search', search);

   const data = await axiosClient.get(
      `${END_POINT.USER}/get-customer-infor?search=${search}&pageIndex=${pageIndex}&pageSize=${pageSize}`
   );
   return data;
};
export const getCustomerWithId = async (id) => {
   const data = await axiosClient.get(`${END_POINT.USER}/customer/${id}`);
   return data;
};

//areas message
export const getUserMessage = async () => {
   await checkAndRenewToken();
   return axiosClient.get(`${END_POINT.MESSAGE}/userList`, {
      headers: {
         Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('webbanbalo_user')).token
               .accessToken
         }`,
      },
   });
};

export const getMessageWithUserId = async (receiverId) => {
   await checkAndRenewToken();
   return axiosClient.get(`${END_POINT.MESSAGE}/${receiverId}`, {
      headers: {
         Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('webbanbalo_user')).token
               .accessToken
         }`,
      },
   });
};

export const InsertReview = (infor) => {
   return axiosClient.post(`${END_POINT.REVIEW}`, infor);
};
