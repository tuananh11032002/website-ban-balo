const baseUrl = process.env.REACT_APP_URL_IMG;

const processApiImagePath = (apiImagePath) => {
  if (!apiImagePath) {
    return null;
  }

  if (
    apiImagePath.startsWith("http://") ||
    apiImagePath.startsWith("https://") ||
    apiImagePath.startsWith("blob:")
  ) {
    return apiImagePath;
  } else {
    return baseUrl + apiImagePath.replace(/\\/g, "/");
  }
};

export default processApiImagePath;
