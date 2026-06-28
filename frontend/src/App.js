import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import FarmerDashboard from "./pages/FarmerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import AdminUsers from "./pages/AdminUsers";
import AdminProducts from "./pages/AdminProducts";
import AdminPosts from "./pages/AdminPosts";
import AdminSchemes from "./pages/AdminSchemes";
import AdminCropGuide from "./pages/AdminCropGuide";
import PendingProducts from "./pages/PendingProducts";

import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import EditProduct from "./pages/EditProduct";

import Community from "./pages/Community";
import Weather from "./pages/Weather";
import GovtSchemes from "./pages/GovtSchemes";

import Marketplace from "./pages/Marketplace";
import ProductDetails from "./pages/ProductDetails";

import Profile from "./pages/Profile";

/* Crop Guide */
import CropGuide from "./pages/CropGuide";
import CropDetails from "./pages/CropDetails";

/* Purchase */
import MyPurchases from "./pages/MyPurchases";

/* Orders */
import MyOrders from "./pages/MyOrders";

/* Admin Orders */
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home - Landing Page */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Farmer Dashboard */}
        <Route
          path="/farmer-dashboard"
          element={<FarmerDashboard />}
        />

        {/* Crop Guide */}
        <Route
          path="/crop-guide"
          element={<CropGuide />}
        />

        <Route
          path="/crop/:name"
          element={<CropDetails />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin-users"
          element={<AdminUsers />}
        />

        <Route
          path="/admin-products"
          element={<AdminProducts />}
        />

        <Route
          path="/admin-posts"
          element={<AdminPosts />}
        />

        <Route
          path="/admin-schemes"
          element={<AdminSchemes />}
        />

        <Route
          path="/admin-crop-guide"
          element={<AdminCropGuide />}
        />

        <Route
          path="/admin-pending-products"
          element={<PendingProducts />}
        />

        {/* Admin Orders */}
        <Route
          path="/admin-orders"
          element={<AdminOrders />}
        />

        {/* Products */}
        <Route
          path="/add-product"
          element={<AddProduct />}
        />

        <Route
          path="/my-products"
          element={<MyProducts />}
        />

        <Route
          path="/edit-product/:id"
          element={<EditProduct />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        {/* Community */}
        <Route
          path="/community"
          element={<Community />}
        />

        {/* Weather */}
        <Route
          path="/weather"
          element={<Weather />}
        />

        {/* Govt Schemes */}
        <Route
          path="/govt-schemes"
          element={<GovtSchemes />}
        />

        {/* Marketplace */}
        <Route
          path="/marketplace"
          element={<Marketplace />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* Purchase History */}
        <Route
          path="/my-purchases"
          element={<MyPurchases />}
        />

        {/* My Orders */}
        <Route
          path="/my-orders"
          element={<MyOrders />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;