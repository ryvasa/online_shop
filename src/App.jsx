import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notfound from "./pages/Notfound";
import UserList from "./pages/UserList";
import OrderList from "./pages/OrderList";
import ProductList from "./pages/ProductList";
import Transaction from "./pages/Transaction";
import EditUser from "./pages/EditUser";
import User from "./pages/User";
import axios from "axios";
import Product from "./pages/Product";
import EditProduct from "./pages/EditProduct";
import OrderDetail from "./pages/OrderDetail";
import AddProduct from "./pages/AddProduct";
import AddUser from "./pages/AddUser";

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/adduser" element={<AddUser />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users/:id/edit" element={<EditUser />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/addproduct" element={<AddProduct />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
