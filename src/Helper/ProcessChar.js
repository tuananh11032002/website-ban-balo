function demSoChuTrongChuoi(chuoi) {
   let mangTu = chuoi.split(/\s+/);

   let tuChuaChu = mangTu.filter(function (tu) {
      return tu.match(/[a-zA-Z]/);
   });

   return tuChuaChu.length;
}
export default demSoChuTrongChuoi;
