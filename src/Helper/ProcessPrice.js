const processPrice = (price, discount) => {
   if (discount === 0) {
      return 0;
   }

   const percentage = ((price - discount) / price) * 100;
   return Math.ceil(100 - percentage);
};
export default processPrice;
