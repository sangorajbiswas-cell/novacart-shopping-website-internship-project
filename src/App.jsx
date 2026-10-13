import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";

// App is the main component. It sets up:
// - The CartProvider (so the cart is shared across all pages)
// - The Navbar (appears on every page)
// - The routes for each page
// - The Footer (appears on every page)

function App() {
  // searchQuery is passed to the Products page when the user
  // searches from the Navbar search bar
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(value) {
    setSearchQuery(value);
  }

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Navbar onSearch={handleSearch} />

          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/products"
                element={<Products searchQuery={searchQuery} />}
              />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
              {/* If someone visits a page that does not exist, go to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
