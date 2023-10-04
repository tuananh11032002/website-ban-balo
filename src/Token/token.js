import { RenewToken } from "../Axios/web";

const checkAndRenewToken = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token;
    const response = await RenewToken(
      JSON.parse(localStorage.getItem("webbanbalo_user")).token
    );

    if (response.success == true) {
      const userTemp = JSON.parse(localStorage.getItem("webbanbalo_user"));
      const userTemp1 = { ...userTemp, token: response.token };
      localStorage.setItem("webbanbalo_user", JSON.stringify(userTemp1));
      console.log("da cap token moi");
    } else {
      console.log(response.message);
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra và cấp token mới:", error);
  }
};

export default checkAndRenewToken;
