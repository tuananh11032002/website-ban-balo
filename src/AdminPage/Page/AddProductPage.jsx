import React from "react";
import Admin from "../Admin";
import { AddProduct } from "../Component/AddProduct";

const AddProductPage = () => {
  return <Admin indexActive={8} Child={AddProduct}></Admin>;
};

export default AddProductPage;
