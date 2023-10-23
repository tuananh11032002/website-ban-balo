import React, { useState } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Profile from "../Component/Account/Profile";

const Component1 = () => <Profile />;
const Component2 = ({ closeComponent2 }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h2>Component 2</h2>
      <p>This is Component 2 content.</p>
      <button
        style={{ padding: "5px 10px", background: "red", color: "white" }}
        onClick={() => closeComponent2()}
      >
        Đóng Component 2
      </button>
    </div>
  );
};

export default Component1;
