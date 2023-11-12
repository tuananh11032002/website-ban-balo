import { RenewToken } from "../Axios/web";

const checkAndRenewToken = async () => {
  try {
    const response = await RenewToken(
      JSON.parse(localStorage.getItem("webbanbalo_user")).token
    );
    if (response.success) {
      const userTemp = JSON.parse(localStorage.getItem("webbanbalo_user"));
      const userTemp1 = { ...userTemp, token: response };
      localStorage.setItem("webbanbalo_user", JSON.stringify(userTemp1));
    } else {
      console.log(response.message);
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra và cấp token mới:", error);
  }
};

export default checkAndRenewToken;
