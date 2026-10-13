import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/products";

// The Home page brings together the hero banner, category cards,
// and a selection of featured products.

function Home() {
  const featuredProducts = products.filter((p) => p.badge).slice(0, 8);
  const bestSellers = products.filter((p) => p.badge === "Best Seller").slice(0, 4);

  return (
    <div>
      <Hero />

      {/* Category Cards Section */}
      <section className="nc-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="nc-section-title">Shop by Category</h2>
            <p className="nc-section-subtitle">Find exactly what you are looking for</p>
          </div>
          <div className="row g-4">
            {categories.map((cat) => (
              <div className="col-6 col-md-3" key={cat.name}>
                <Link to={`/products?category=${cat.name}`} className="nc-category-card">
                  <div className="nc-category-img-wrap">
                    <img src={cat.image} alt={cat.name} loading="lazy" />
                  </div>
                  <div className="nc-category-label">
                    <h5>{cat.name}</h5>
                    <span>Shop Now <i className="bi bi-arrow-right"></i></span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="nc-section nc-section-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <h2 className="nc-section-title mb-1">Featured Products</h2>
              <p className="nc-section-subtitle mb-0">Handpicked favorites just for you</p>
            </div>
            <Link to="/products" className="btn nc-btn-outline d-none d-md-inline-block">
              View All <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
          <div className="row g-4">
            {featuredProducts.map((product) => (
              <div className="col-6 col-md-4 col-lg-3" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4 d-md-none">
            <Link to="/products" className="btn nc-btn-outline">
              View All Products <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="nc-section">
        <div className="container">
          <div className="nc-promo-banner">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h2 className="nc-promo-title">Mid-Season Sale</h2>
                <p className="nc-promo-text">
                  Up to 40% off on selected items. Limited time only.
                </p>
              </div>
              <div className="col-md-4 text-md-end">
                <Link to="/products" className="btn nc-btn-light btn-lg">
                  Grab the Deals <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      {bestSellers.length > 0 && (
        <section className="nc-section nc-section-light">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="nc-section-title">Best Sellers</h2>
              <p className="nc-section-subtitle">Our most loved products by customers</p>
            </div>
            <div className="row g-4">
              {bestSellers.map((product) => (
                <div className="col-6 col-md-4 col-lg-3" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Feature Highlights */}
      <section className="nc-section">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-3 col-6">
              <div className="nc-feature">
                <i className="bi bi-truck nc-feature-icon"></i>
                <h6>Free Shipping</h6>
                <p>On orders above ₹999</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="nc-feature">
                <i className="bi bi-arrow-repeat nc-feature-icon"></i>
                <h6>Easy Returns</h6>
                <p>30-day return policy</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="nc-feature">
                <i className="bi bi-shield-check nc-feature-icon"></i>
                <h6>Secure Payment</h6>
                <p>100% protected</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="nc-feature">
                <i className="bi bi-headset nc-feature-icon"></i>
                <h6>24/7 Support</h6>
                <p>Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
