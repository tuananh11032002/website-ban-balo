import React from "react";
import Button from "./Component/Button";
import Product from "./Component/Product";
import { Link, useNavigate } from "react-router-dom";
import ListProduct from "./Component/ListProduct";

const Admin = () => {
  const navigate = useNavigate();

  const handlerClick = (type) => {
    if (type == "product") {
      navigate("product");
    }
  };
  return (
    <div>
      <button
        onClick={() => {
          return handlerClick("product");
        }}
      >
        Product
      </button>
      <button
        onClick={() => {
          return handlerClick("category");
        }}
      >
        Category
      </button>
      <Product />
      <ListProduct />
    </div>
  );
};

export default Admin;
