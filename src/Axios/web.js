import axiosClient from "./axiosClient";
import checkAndRenewToken from "../Token/token";

const END_POINT = {
  ADDRESS:"address",
  CHAT:"chat",
  COMMENT:"comment",
  FILE:"file",
  ORDER: "order",
  PRODUCT: "product",
  CATEGORY: "category",
  USER: "user",
};
// Address
  //add
  export const addAddress = (address) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.post(`${END_POINT.ADDRESS}`, address, {
      headers: {
        Authorization: token,
      },
    });
  };
  //update
  export const updateAddress = (address) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.put(`${END_POINT.ADDRESS}`, address, {
      headers: {
        Authorization: token,
      },
    });
  };
  //delete
  export const deleteAddress = (id) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.delete(`${END_POINT.ADDRESS}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  };
  //get(id)
  export const getAddress = (id) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.get(`${END_POINT.ADDRESS}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  };
  //get list
  export const getListAddress = (data) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.post(`${END_POINT.ADDRESS}/list`, data, {
      headers: {
        Authorization: token,
      },
    });
  };

// end Address
  
// Chat
  //add
  export const addChat = (chat) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.post(`${END_POINT.CHAT}`, chat, {
      headers: {
        Authorization: token,
      },
    });
  };
  //get list group
  export const getListGroup = (data) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.post(`${END_POINT.CHAT}/list`, data, {
      headers: {
        Authorization: token,
      },
    });
  };
  //get message by group
  export const getMessageByGroup = (data) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.post(`${END_POINT.CHAT}/message`, data, {
      headers: {
        Authorization: token,
      },
    });
  };
  //get message by my group
  export const getMessageByMyGroup = (data) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.post(`${END_POINT.CHAT}/mine`, data, {
      headers: {
        Authorization: token,
      },
    });
  };
// end Chat
  
// Comment
  //add
  export const addComment = (comment) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.post(`${END_POINT.COMMENT}`, comment, {
      headers: {
        Authorization: token,
      },
    });
  };
  //get list
  export const getListComment = (data) => {
    return axiosClient.post(`${END_POINT.COMMENT}/list`, data);
  };
// end Comment

// File
  //add
  export const addFile = (files) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.post(`${END_POINT.FILE}`, files, {
      headers: {
        Authorization: token,
      },
    });

  };
  //delete
  export const deleteFile = (id) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.delete(`${END_POINT.FILE}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  };
  //get(id)
  export const getFile = (id) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.get(`${END_POINT.FILE}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  };
// end File


// Order
  //add
  export const addOrder = (order) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.post(`${END_POINT.ORDER}`, order, {
      headers: {
        Authorization: token,
      },
    });
  };
  //update
  export const updateOrder = (order) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.put(`${END_POINT.ORDER}`, order, {
      headers: {
        Authorization: token,
      },
    });
  };
  //work flow order
  export const workFlowOrder = (order) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.put(`${END_POINT.ORDER}/wf`, order, {
      headers: {
        Authorization: token,
      },
    });
  };
  //delete
  export const deleteOrder = (id) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.delete(`${END_POINT.ORDER}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  };
  //get(id) order information
  export const getOrder = (id) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.get(`${END_POINT.ORDER}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  };
  //get list
  export const getListOrder = (data) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.post(`${END_POINT.ORDER}/list`, data , {
      headers: {
        Authorization: token,
      },
    });
  };
  //get my list 
  export const getMyListOrder = (data) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.post(`${END_POINT.ORDER}/listmine`, data, {
      headers: {
        Authorization: token,
      },
    });
  };  
// end Order

// Product
  //add
  export const addProduct = (product) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.post(`${END_POINT.PRODUCT}`, product, {
      headers: {
        Authorization: token,
      },
    });
  };
  //update
  export const updateProduct = (product) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.put(`${END_POINT.PRODUCT}`, product, {
      headers: {
        Authorization: token,
      },
    });
  };
  //delete
  export const deleteProduct = (id) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.delete(`${END_POINT.PRODUCT}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  };
  //get(id)
  export const getProduct = (id) => {
    return axiosClient.get(`${END_POINT.PRODUCT}/${id}`);
  };
  //get list
  export const getListProduct = (data) => {
    return axiosClient.post(`${END_POINT.PRODUCT}/list`, data );
  };
  //get list admin
  export const getListProductForAdmin = (data) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.post(`${END_POINT.PRODUCT}/la`, data, {
      headers: {
        Authorization: token,
      },
    });
  };
// end Product

// ProductCategory
  //add
  export const addCategory = (category) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.post(`${END_POINT.CATEGORY}`, category, {
      headers: {
        Authorization: token,
      },
    });
  };
  //update
  export const updateCategory = (category) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.put(`${END_POINT.CATEGORY}`, category, {
      headers: {
        Authorization: token,
      },
    });
  };
  //delete
  export const deleteCategory = (id) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.delete(`${END_POINT.CATEGORY}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  };
  //get(id)
  export const getCategory = (id) => {
    return axiosClient.get(`${END_POINT.CATEGORY}/${id}`);
  };
  //get list
  export const getListCategory = (data) => {
    return axiosClient.post(`${END_POINT.CATEGORY}/list`, data );
  };
  //get list admin
  export const getListCategoryForAdmin = (data) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.post(`${END_POINT.CATEGORY}/la`, data, {
      headers: {
        Authorization: token,
      },
    });
  };
// end ProductCategory

// User
  //register
  export const register = (data) => {
    return axiosClient.post(`${END_POINT.USER}`, data );
  };
  //update profile
  export const updateProfile = (data) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.put(`${END_POINT.USER}`, data , {
      headers: {
        Authorization: token,
      },
    });
  };
  //send verify code
  export const sendVerifyCode = () => {// check by token
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.get(`${END_POINT.USER}`, {
      headers: {
        Authorization: token,
      },
    });
  };
  //login
  export const login = (data) => {
    return axiosClient.post(`${END_POINT.USER}/lg`, data );
  };
  //List account
  export const getListAccount = (data) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.post(`${END_POINT.USER}/list`, data , {
      headers: {
        Authorization: token,
      },
    });
  };
  //update avatar
  export const addAvatar = (data) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.post(`${END_POINT.USER}/pro/pic`, data, {
      headers: {
        Authorization: token,
      },
    } );
  };
  //get avatar
  export const getAvatar = (file) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;    
    return axiosClient.get(`${END_POINT.USER}/pro/pic`, file, {
      headers: {
        Authorization: token,
      },
    });
  };
  //validate account
  export const validateCode = (validCode) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.put(`${END_POINT.USER}/${validCode}`, {
      headers: {
        Authorization: token,
      },
    });
  };
  //get account by id
  export const getAccountById = (id) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.get(`${END_POINT.USER}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  };
  //delete account
  export const deleteAccount = (id) => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    return axiosClient.delete(`${END_POINT.USER}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  };
  //get account by token
  export const getProfileByToken = () => {
    //require author
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;    
    return axiosClient.get(`${END_POINT.USER}/pro`, {
      headers: {
        Authorization: token,
      },
    });
  };

// end User

export const getCATEGORYAPI = () => {
  return axiosClient.get(`${END_POINT.CATEGORY}`, {
    withCredentials: false,
  });
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

export const DeleteProductIntoOrder = async (productid) => {
  await checkAndRenewToken();
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
  return axiosClient.post(`${END_POINT.USER}/AddUser`, { ...userInfor, id: 0 });
};
export const RenewToken = (tokenModel) => {
  return axiosClient.post(`${END_POINT.USER}/RenewToken`, tokenModel);
};

//areas message
export const getUserMessage = async () => {
  await checkAndRenewToken();
  return axiosClient.get(`${END_POINT.MESSAGE}/userList`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("webbanbalo_user")).token.accessToken
      }`,
    },
  });
};

export const getMessageWithUserId = async (receiverId) => {
  await checkAndRenewToken();
  return axiosClient.get(`${END_POINT.MESSAGE}/${receiverId}`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("webbanbalo_user")).token.accessToken
      }`,
    },
  });
};
