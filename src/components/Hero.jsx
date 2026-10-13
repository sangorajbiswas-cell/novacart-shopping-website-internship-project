import { Link } from "react-router-dom";

// The Hero section is the large banner at the top of the Home page.
// It has a headline, a short description, and a call-to-action button.

function Hero() {
  return (
    <section className="nc-hero">
      <div className="container">
        <div className="row align-items-center min-vh-60 py-5">
          <div className="col-lg-6 py-5">
            <p className="nc-hero-eyebrow">New Collection 2026</p>
            <h1 className="nc-hero-title">
              Elevate Your Style with <span className="nc-brand-accent">NovaCart</span>
            </h1>
            <p className="nc-hero-subtitle">
              Discover premium clothing, footwear, and accessories curated for the
              modern lifestyle. Quality meets affordability in every piece.
            </p>
            <div className="nc-hero-buttons">
              <Link to="/products" className="btn nc-btn-dark btn-lg">
                Shop Now <i className="bi bi-arrow-right ms-2"></i>
              </Link>
              <Link to="/contact" className="btn nc-btn-outline btn-lg">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <div className="nc-hero-image-wrap">
              <img
                src="https://images.pexels.com/photos/31618286/pexels-photo-31618286.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Fashion model wearing smart casual attire"
                className="nc-hero-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
