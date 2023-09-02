import styled from "styled-components";
import Home from "./Page/Home";
import Admin from "./AdminPage/Admin";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import ProductDetail from "./Component/Body/ProductDetail";

import PayPage from "./Page/PayPage";
import Cart from "./Page/Cart";
import About from "./Page/About";
import Membership from "./Page/Membership";
import Address from "./Page/Address";
import Test from "./Page/Test";
import Slide from "./Page/Slide";

import "./AppTransition.css";
import ExampleA from "./Page/ExampleA";
import Test1 from "./Page/Test1";
import LoginPage from "./Page/Login";
import { useStateProvider } from "./StateProvider/StateProvider";
import { useEffect } from "react";
import { reducerCases } from "./StateProvider/reducer";
function App() {
  const location = useLocation();

  const [{ user }, dispatch] = useStateProvider();
  useEffect(() => {
    const userLocal = localStorage.getItem("webbanbalo_user");

    if (userLocal != JSON.stringify(user) && userLocal != null) {
      console.log("da set app", userLocal, " yy", JSON.stringify(user));

      console.log(userLocal != JSON.stringify(user));
      dispatch({ type: reducerCases.SET_USER, user: JSON.parse(userLocal) });
    }
  });

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Slide child={<Home />} />}></Route>
        <Route path="/products" element={<Slide child={<Home />} />}></Route>
        <Route
          path="/products/:productId"
          element={<Slide child={<ProductDetail />} />}
        ></Route>
        <Route
          path="/collections/:categoryName"
          element={<Slide child={<Home />} />}
        ></Route>
        <Route path="/admin" element={<Slide child={<Admin />} />}></Route>
        <Route path="/pay" element={<Slide child={<PayPage />} />}></Route>
        <Route path="/cart" element={<Slide child={<Cart />} />}></Route>
        <Route path="/about-us" element={<Slide child={<About />} />}></Route>
        <Route
          path="/membership"
          element={<Slide child={<Membership />} />}
        ></Route>
        <Route path="/address" element={<Slide child={<Address />} />}></Route>
        <Route path="/test" element={<Slide child={<Test />} />}></Route>
        <Route path="/test1" element={<Slide child={<Test1 />} />}></Route>
        {/* <Route path="/login" element={<Slide child={<LoginPage />} />}></Route> */}
        <Route
          path="login"
          element={<>{user ? <Navigate to="/" /> : <LoginPage />}</>}
        />
      </Routes>
    </Container>
  );
}
const Container = styled.div``;
export default App;
