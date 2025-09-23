import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import ProductDetails from "./pages/JustforDetails";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar fixed, so add padding-top to main content */}
        <Navbar />
        
        <main className="flex-grow pt-16"> 
          {/* pt-16 = height of navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
