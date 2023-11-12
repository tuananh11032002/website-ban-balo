import { format } from "date-fns";

const ProcessDate = (date) => {
  const originalDate = "2023-07-04T04:43:54.452";
  const dateObject = new Date(originalDate);
  const formattedDate = format(dateObject, "do MMMM, yyyy");
  return formattedDate;
};
export default ProcessDate;
