import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

// The Navbar appears on every page. It has the NovaCart logo,
// links to all pages, a search bar, and a cart icon with a badge.

function Navbar({ onSearch }) {
  const { cartCount } = useCart();
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    onSearch(searchValue);
    setMenuOpen(false);
  }

  const navLinkClass = ({ isActive }) =>
    "nav-link nc-nav-link" + (isActive ? " nc-nav-link-active" : "");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white nc-navbar sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold nc-brand" onClick={() => setMenuOpen(false)}>
          Nova<span className="nc-brand-accent">Cart</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={"collapse navbar-collapse" + (menuOpen ? " show" : "")}>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink to="/" end className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Contact
              </NavLink>
            </li>
          </ul>

          <form className="d-flex nc-search-form me-lg-3 my-2 my-lg-0" onSubmit={handleSearch}>
            <input
              className="form-control nc-search-input"
              type="search"
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              aria-label="Search"
            />
          </form>

          <Link to="/cart" className="btn nc-cart-btn position-relative" onClick={() => setMenuOpen(false)}>
            <i className="bi bi-bag"></i>
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill nc-cart-badge">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
