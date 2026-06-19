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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;