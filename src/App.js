import "./App.css";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Women from "./Components/Women";
import Homedecor from "./Components/Homedecor";
import ProductList from "./Components/ProductList";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./Components/ProductDetails";
import Cart from "./Components/Cart";
import WishList from "./Components/WishList";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/women" element={<Women />} />
        <Route path="/homedecor" element={<Homedecor />} />
        <Route path="/product/:categoryId" element={<ProductList />} />
        <Route
          path="/product/details/:productId"
          element={<ProductDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </div>
  );
}

export default App;
