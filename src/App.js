import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import CreateOrder from "./Screens/Creatorder";
import Header from "./Screens/Header";
import Login from "./Screens/Login";
import SignUp from "./Screens/Signup";
import Welcome from "./Screens/Welcome";
import OrderCom from "./Screens/Home page components/OrderCom";
import Message from "./Screens/Chat components/messageold";
import Chatepage from "./Screens/Chat components/chatpage";
import New from "./Screens/Chat components/message";
import Watchlist from "./Screens/Watchlist";
import Matches from "./Screens/Matche";

const App = () => {
  const pathnames = ["/", "/SignUp", "/Welcome"];

  return (
    <div>
      {/* {window.location.pathname ==  ? null : <Header />} */}
      {pathnames.includes(window.location.pathname) ? null : <Header />}
      <Routes>
        {<Route path="/" element={<Login />} />}
        {/* <Route path="/Home" element={<Login />} /> */}
        <Route path="/SignUp" element={<SignUp />} />
        {/* <Route path="/Message" element={<Message />} /> */}
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/OrderCom" element={<OrderCom />} />
        <Route path="/Matche" element={<Matches />} />
        <Route path="/CreateOrder" element={<CreateOrder />} />
        <Route path="/Chatepage" element={<Chatepage />} />
        <Route path="/new" element={<New />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </div>
  );
};

export default App;
