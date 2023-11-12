import React, { useState } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Table from "../Component/Body/Table";
import ProductDetail from "../Component/Body/ProductDetail";
import ProductAddedMessage from "../Component/Body/ProductAddedMessage";

const Cart = () => {
  console.log("cart");
  return (
    <>
      <Header />
      <div className="table" style={{ overflowX: "auto" }}>
        <Table />
      </div>
      <Footer />
    </>
  );
};

export default Cart;
