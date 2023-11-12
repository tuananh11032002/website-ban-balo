const processLocaleStringToNumber = (value) => {
  const numericValue = Number(value.replace(/[^0-9.-]+/g, ""));
  return numericValue || 0;
};
export default processLocaleStringToNumber;
