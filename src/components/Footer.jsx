import { Link } from "react-router-dom";

// The Footer appears at the bottom of every page with links and info.

function Footer() {
  return (
    <footer className="nc-footer mt-auto">
      <div className="container">
        <div className="row gy-4 py-5">
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold nc-footer-brand">
              Nova<span className="nc-brand-accent">Cart</span>
            </h5>
            <p className="nc-footer-text mt-3">
              Your premium destination for clothing and lifestyle products.
              Quality you can trust, style you deserve.
            </p>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="nc-footer-heading">Shop</h6>
            <ul className="list-unstyled nc-footer-links">
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products?category=Men">Men</Link></li>
              <li><Link to="/products?category=Women">Women</Link></li>
              <li><Link to="/products?category=Footwear">Footwear</Link></li>
              <li><Link to="/products?category=Accessories">Accessories</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="nc-footer-heading">Company</h6>
            <ul className="list-unstyled nc-footer-links">
              <li><Link to="/contact">Contact Us</Link></li>
              <li><a href="#!">About Us</a></li>
              <li><a href="#!">Privacy Policy</a></li>
              <li><a href="#!">Terms of Service</a></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h6 className="nc-footer-heading">Stay Updated</h6>
            <p className="nc-footer-text">Subscribe for exclusive deals and new arrivals.</p>
            <div className="input-group nc-newsletter">
              <input type="email" className="form-control" placeholder="Enter your email" />
              <button className="btn nc-btn-dark" type="button">Subscribe</button>
            </div>
            <div className="nc-social-icons mt-3">
              <a href="#!" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href="#!" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="#!" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
              <a href="#!" aria-label="YouTube"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
        </div>

        <div className="nc-footer-bottom text-center py-3">
          <p className="mb-0 nc-footer-text">
            &copy; {new Date().getFullYear()} NovaCart. All rights reserved. Built for a frontend internship assignment.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
