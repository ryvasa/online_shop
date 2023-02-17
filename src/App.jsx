import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./pages/Cart";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Notfound } from "./pages/Notfound";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import axios from "axios";
import { useSelector } from "react-redux";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Order from "./pages/Order";
import DetailOrder from "./pages/DetailOrder";

axios.defaults.withCredentials = true;
function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/:id" element={<DetailOrder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
