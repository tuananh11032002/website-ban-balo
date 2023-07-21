import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Table from "../Component/Body/Table";
import ProductDetail from "../Component/Body/ProductDetail";

const Cart = () => {
  return (
    <div>
      <Header />
      <div className="table">
        <Table />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
