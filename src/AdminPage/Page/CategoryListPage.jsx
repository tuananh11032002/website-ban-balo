import React from "react";
import Admin from "../Admin";
import CategoryList from "../Component/CategoryList";

const CategoryListPage = () => {
  return <Admin indexActive={6} Child={CategoryList}></Admin>;
};

export default CategoryListPage;
