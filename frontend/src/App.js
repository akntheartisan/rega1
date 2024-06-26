import "./App.css";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import React, { useState, createContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { client } from "./components/Client/Client";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import ProductView from "./components/ProductView/ProductView";

export const UserContext = createContext();
function App() {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await client.get("/user/protect", {
          withCredentials: true,
        });
        const user = response.data.user;
        if (response.status === 200) {
          setUserData(user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  return (
    <>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "#809c13",
                color: "white",
              },
            },
            error: {
              style: {
                background: "#ff5252",
                color: "white",
              },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/productview" element={<ProductView/>}/>
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/register" element={<LoginPage />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
