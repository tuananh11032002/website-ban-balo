import styled from "styled-components";
import Home from "./Page/Home";
import Test from "./Component/Tam";
import { Route, Routes, Navigate } from "react-router-dom";
import ProductDetail from "./Component/Body/ProductDetail";
import WebSocket from "./AppSocket";
import PayPage from "./Page/PayPage";
import Cart from "./Page/Cart";
import About from "./Page/About";
import Membership from "./Page/Membership";
import Address from "./Page/Address";
import Slide from "./Page/Slide";
import "./AppTransition.css";
import LoginPage from "./Page/Login";
import { useStateProvider } from "./StateProvider/StateProvider";
import { useEffect, useState } from "react";
import { reducerCases } from "./StateProvider/reducer";
import ProfileAccount from "./Page/ProfileAccount";
import AddressAccount from "./Page/AddressAccount";
import OrderAccount from "./Page/OrderAccount";
import RegisterPage from "./Page/RegisterPage";
import * as signalR from "@microsoft/signalr";
import checkAndRenewToken from "./Token/token";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ProductListPage from "./AdminPage/Page/ProductListPage";
import ChatPage from "./AdminPage/Page/ChatPage";
import CategoryListPage from "./AdminPage/Page/CategoryListPage";
import OrderListPage from "./AdminPage/Page/OrderListPage";
import UserListPage from "./AdminPage/Page/UserListPage";
import CustomerListPage from "./AdminPage/Page/CustomerListPage";
import AddProductPage from "./AdminPage/Page/AddProductPage";
import CustomerDetailPage from "./AdminPage/Page/CustomerDetailPage";
import DetailOrderPage from "./AdminPage/Page/DetailOrderPage";
import NotFound from "./Page/NotFound";
import AccountDetailPage from "./AdminPage/Page/AccountDetailPage";
import RegistrationPage from "./Page/RegistrationPage";
import PaymentInfo from "./Page/PaymentInfo";
import PasswordAccount from "./Page/PasswordAccount";

function App() {
  const [isUserReady, setIsUserReady] = useState(false);
  const [{ user, loading }, dispatch] = useStateProvider();
  useEffect(() => {
    const userLocal = localStorage.getItem("webbanbalo_user");

    if (userLocal !== JSON.stringify(user) && userLocal !== null) {
      dispatch({ type: reducerCases.SET_USER, user: JSON.parse(userLocal) });
    }
    setIsUserReady(true);
  }, [user]);
  // "https://localhost:44301/messageHub"
  useEffect(() => {
    let connectionHub;
    const connectToSignalRHub = async () => {
      try {
        connectionHub = new signalR.HubConnectionBuilder()
          .withUrl("https://localhost:44301/messageHub", {
            accessTokenFactory: async () => {
              await checkAndRenewToken();
              const token = JSON.parse(localStorage.getItem("webbanbalo_user"))
                .token.accessToken;
              return token;
            },
          })
          .withAutomaticReconnect()
          .build();

        connectionHub.onclose(() => {
          console.log("SignalR connection closed");
          dispatch({
            connection: connectionHub,
            type: reducerCases.SET_CONNECTIONHUB,
          });
        });

        await connectionHub.start();

        dispatch({
          connection: connectionHub,
          type: reducerCases.SET_CONNECTIONHUB,
        });

        console.log("Connected to SignalR hub");
      } catch (error) {
        console.error("Error connecting to SignalR hub:", error);
      }
    };

    if (user) connectToSignalRHub();

    return () => {
      if (user) connectionHub.stop();
    };
  }, [user]);

  return (
    <>
      {loading === true ? (
        <div className="loading">
          <AiOutlineLoading3Quarters />
        </div>
      ) : null}
      <Container>
        {isUserReady ? (
          <Routes>
            <Route path="/" element={<Slide child={<Home />} />}></Route>
            <Route
              path="/products"
              element={<Slide child={<Home />} />}
            ></Route>
            <Route
              path="/products/:productId"
              element={<Slide child={<ProductDetail />} />}
            ></Route>
            <Route
              path="/collections/:categoryName"
              element={<Slide child={<Home />} />}
            ></Route>

            <Route path="/pay" element={<Slide child={<PayPage />} />}></Route>
            <Route
              path="/pay-method"
              element={<Slide child={<PaymentInfo />} />}
            ></Route>

            <Route path="/cart" element={<Slide child={<Cart />} />}></Route>
            <Route
              path="/about-us"
              element={<Slide child={<About />} />}
            ></Route>
            <Route
              path="/membership"
              element={<Slide child={<Membership />} />}
            ></Route>
            <Route
              path="/address"
              element={<Slide child={<Address />} />}
            ></Route>

            <Route
              path="login"
              element={<>{user ? <Navigate to="/" /> : <LoginPage />}</>}
            />
            <Route
              path="register"
              element={<>{user ? <Navigate to="/" /> : <RegistrationPage />}</>}
            />
            <Route path="/account/address" element={<AddressAccount />} />
            <Route path="/account/profile" element={<ProfileAccount />} />
            <Route path="/account/order" element={<OrderAccount />} />
            <Route
              path="/account/change-password"
              element={<PasswordAccount />}
            />

            <Route path="/chat" element={<Slide child={<WebSocket />} />} />
            <Route
              path="/register"
              element={<Slide child={<RegisterPage />} />}
            />
            <Route
              path="/admin"
              element={<Slide child={<ProductListPage />} />}
            />
            <Route
              path="/admin/chat"
              element={<Slide child={<ChatPage />} />}
            />
            <Route
              path="/admin/order-list"
              element={<Slide child={<OrderListPage />} />}
            />
            <Route
              path="/admin/category-list"
              element={<Slide child={<CategoryListPage />} />}
            />
            <Route
              path="/admin/user-list"
              element={<Slide child={<UserListPage />} />}
            />
            <Route
              path="/admin/customer-list"
              element={<Slide child={<CustomerListPage />} />}
            />

            <Route
              path="/admin/add-product/:id"
              element={<Slide child={<AddProductPage />} />}
            />
            <Route
              path="/admin/customer-detail/:id"
              element={<Slide child={<CustomerDetailPage />} />}
            />
            <Route
              path="/admin/order-detail/:id"
              element={<Slide child={<DetailOrderPage />} />}
            />
            <Route path="/test123" element={<Test />} />

            <Route
              path="/admin/account-detail/:id"
              element={<Slide child={<AccountDetailPage />} />}
            />
            <Route path="*" element={<Slide child={<NotFound />} />} />
          </Routes>
        ) : null}
      </Container>
    </>
  );
}
const Container = styled.div``;
export default App;
