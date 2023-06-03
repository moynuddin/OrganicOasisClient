import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./layout";
import Profile from "./components/Profile";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import OrderComplete from "./components/OrderComplete";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <Router>
      <Layout>
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/paymentsuccess" element={<OrderComplete />} />
          <Route exact path="forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
