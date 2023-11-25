import React, { useEffect, useState } from 'react';
import { RenewToken } from './Axios/web';
import checkAndRenewToken from './Token/token';

const AppTem = () => {
   const [data, setData] = useState();
   const renewToken = async () => {
      const response = await checkAndRenewToken();
      setData(response);
      console.log('token AppTem ', response);
   };
   return (
      <div>
         <button onClick={() => renewToken()}>Click here</button>
      </div>
   );
};

export default AppTem;
