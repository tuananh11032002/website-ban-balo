import { format } from 'date-fns';

const ProcessDate = (dateString) => {
   try {
      const dateObject = new Date(dateString);

      // Lấy giờ và phút từ đối tượng Date
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();

      // Format ngày với thêm giờ và phút
      const formattedDate = format(dateObject, `HH'h'mm'p'  dd/MM/yyyy`);

      return formattedDate;
   } catch {
      return null;
   }
};

export default ProcessDate;
