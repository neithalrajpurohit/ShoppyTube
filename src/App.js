import "./App.css";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Women from "./Components/Women";
import Homedecor from "./Components/Homedecor";
import ProductList from "./Components/ProductList";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/women" element={<Women />} />
        <Route path="/homedecor" element={<Homedecor />} />
        <Route path="/product/:categoryId" element={<ProductList />} />
      </Routes>
    </div>
  );
}

export default App;
