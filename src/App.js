import styled from "styled-components";
import Home from "./Page/Home";
import Admin from "./AdminPage/Admin";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./Component/Body/ProductDetail";
import { useStateProvider } from "./StateProvider/StateProvider";
import { useEffect } from "react";
import { GetProductIntoOrder } from "./Axios/web";
import { reducerCases } from "./StateProvider/reducer";
import Tam from "./Component/Tam";
import Cart from "./Page/Cart";
function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Home />}></Route>
        <Route path="/products/:productId" element={<ProductDetail />}></Route>
        <Route path="/collections/:categoryName" element={<Home />} />
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/Tam" element={<Tam />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </Container>
  );
}
const Container = styled.div``;
export default App;
