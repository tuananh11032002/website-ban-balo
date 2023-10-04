import styled from "styled-components";
import Home from "./Page/Home";
import Admin from "./AdminPage/Admin";
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  Redirect,
} from "react-router-dom";
import ProductDetail from "./Component/Body/ProductDetail";
import WebSocket from "./AppSocket";
import PayPage from "./Page/PayPage";
import Cart from "./Page/Cart";
import About from "./Page/About";
import Membership from "./Page/Membership";
import Address from "./Page/Address";
import Test from "./Page/Test";
import Slide from "./Page/Slide";
import "./AppTransition.css";
import Test1 from "./Page/Test1";
import LoginPage from "./Page/Login";
import { useStateProvider } from "./StateProvider/StateProvider";
import { useEffect, useState } from "react";
import { reducerCases } from "./StateProvider/reducer";
import ProfileAccount from "./Page/ProfileAccount";
import AddressAccount from "./Page/AddressAccount";
import OrderAccount from "./Page/OrderAccount";
import RegisterPage from "./Page/RegisterPage";
// import connection from "./Hub/connection";
import * as signalR from "@microsoft/signalr";
import checkAndRenewToken from "./Token/token";

function App() {
  const [isUserReady, setIsUserReady] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [{ user, connection }, dispatch] = useStateProvider();
  useEffect(() => {
    const userLocal = localStorage.getItem("webbanbalo_user");

    if (userLocal != JSON.stringify(user) && userLocal != null) {
      console.log(userLocal != JSON.stringify(user));
      dispatch({ type: reducerCases.SET_USER, user: JSON.parse(userLocal) });
    }
    setIsUserReady(true);
  }, [user]);
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
          setIsConnected(false); // Đánh dấu kết nối bị đóng
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

    connectToSignalRHub();

    return () => {
      connectionHub.stop();
    };
  }, []);

  return (
    <Container>
      {isUserReady ? (
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
          <Route
            path="/address"
            element={<Slide child={<Address />} />}
          ></Route>
          <Route path="/test" element={<Slide child={<Test />} />}></Route>

          <Route path="/test1" element={<Slide child={<Test1 />} />}></Route>
          {/* <Route path="/login" element={<Slide child={<LoginPage />} />}></Route> */}
          <Route
            path="login"
            element={<>{user ? <Navigate to="/" /> : <LoginPage />}</>}
          />
          <Route
            path="/account/address"
            element={<Slide child={<AddressAccount />} />}
          />
          <Route
            path="/account/profile"
            element={<Slide child={<ProfileAccount />} />}
          />
          <Route
            path="/account/order"
            element={<Slide child={<OrderAccount />} />}
          />
          <Route path="/chat" element={<Slide child={<WebSocket />} />} />
          <Route
            path="/register"
            element={<Slide child={<RegisterPage />} />}
          />
        </Routes>
      ) : null}
    </Container>
  );
}
const Container = styled.div``;
export default App;
