import { RenewToken } from '../Axios/web';

const checkAndRenewToken = async () => {
   try {
      const response = await RenewToken(
         JSON.parse(localStorage.getItem('webbanbalo_user')).token
      );

      console.log('response token', response);
      if (response?.status) {
         if (response.result.success) {
            const userTemp = JSON.parse(
               localStorage.getItem('webbanbalo_user')
            );
            const userTemp1 = { ...userTemp, token: response.result.token };
            localStorage.setItem('webbanbalo_user', JSON.stringify(userTemp1));
         }
      } else {
         console.log('error');
      }
   } catch (error) {
      console.error('Lỗi khi kiểm tra và cấp token mới:', error);
   }
};

export default checkAndRenewToken;
