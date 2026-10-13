import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products, formatPrice } from "../data/products";
import { useCart } from "../context/CartContext";

// The Product Detail page shows a large image, full description,
// size and color selection, and an Add to Cart button.
// After adding to cart, a confirmation toast appears.

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === parseInt(id));

  const [selectedSize, setSelectedSize] = useState(
    product ? product.sizes[0] : ""
  );
  const [selectedColor, setSelectedColor] = useState(
    product ? product.colors[0] : ""
  );
  const [showToast, setShowToast] = useState(false);

  if (!product) {
    return (
      <div className="container py-5">
        <div className="nc-empty-state">
          <i className="bi bi-exclamation-circle nc-empty-icon"></i>
          <h4>Product Not Found</h4>
          <p>The product you are looking for does not exist.</p>
          <Link to="/products" className="btn nc-btn-dark">
            <i className="bi bi-arrow-left me-1"></i> Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  function handleAddToCart() {
    addToCart(product, selectedSize, selectedColor);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }

  function handleBuyNow() {
    addToCart(product, selectedSize, selectedColor);
    navigate("/cart");
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="nc-page-wrapper">
      {/* Toast notification */}
      {showToast && (
        <div className="nc-toast">
          <i className="bi bi-check-circle-fill"></i>
          <span>Added to cart successfully!</span>
          <Link to="/cart" className="nc-toast-link">View Cart</Link>
        </div>
      )}

      <div className="container py-4">
        {/* Breadcrumb */}
        <nav className="nc-breadcrumb">
          <Link to="/">Home</Link>
          <i className="bi bi-chevron-right nc-breadcrumb-sep"></i>
          <Link to="/products">Shop</Link>
          <i className="bi bi-chevron-right nc-breadcrumb-sep"></i>
          <span>{product.name}</span>
        </nav>

        {/* Product Detail Section */}
        <div className="row g-4 g-lg-5 nc-product-detail">
          <div className="col-md-6">
            <div className="nc-detail-img-wrap">
              {product.badge && (
                <span className="nc-product-badge">{product.badge}</span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="nc-detail-img"
              />
            </div>
          </div>

          <div className="col-md-6">
            <p className="nc-detail-category">{product.category}</p>
            <h1 className="nc-detail-name">{product.name}</h1>

            <div className="nc-detail-rating">
              <i className="bi bi-star-fill"></i>
              <span className="nc-rating-num">{product.rating}</span>
              <span className="nc-rating-text">
                ({Math.floor(product.rating * 20)} reviews)
              </span>
            </div>

            <div className="nc-detail-price-row">
              <span className="nc-detail-price">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="nc-detail-old-price">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              {product.oldPrice && (
                <span className="nc-detail-discount">
                  Save {formatPrice(product.oldPrice - product.price)}
                </span>
              )}
            </div>

            <p className="nc-detail-description">{product.description}</p>

            {/* Size Selection */}
            <div className="nc-detail-section">
              <label className="nc-detail-label">Size: <strong>{selectedSize}</strong></label>
              <div className="nc-size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={
                      "nc-size-btn" +
                      (selectedSize === size ? " active" : "")
                    }
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="nc-detail-section">
              <label className="nc-detail-label">Color: <strong>{selectedColor}</strong></label>
              <div className="nc-color-options">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={
                      "nc-color-btn" +
                      (selectedColor === color ? " active" : "")
                    }
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="nc-detail-actions">
              <button
                className="btn nc-btn-dark btn-lg nc-detail-add-btn"
                onClick={handleAddToCart}
              >
                <i className="bi bi-bag-plus me-2"></i> Add to Cart
              </button>
              <button
                className="btn nc-btn-outline btn-lg"
                onClick={handleBuyNow}
              >
                Buy Now <i className="bi bi-arrow-right ms-1"></i>
              </button>
            </div>

            {/* Feature badges */}
            <div className="nc-detail-features">
              <div className="nc-detail-feature">
                <i className="bi bi-truck"></i> Free shipping over ₹999
              </div>
              <div className="nc-detail-feature">
                <i className="bi bi-arrow-repeat"></i> 30-day easy returns
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="nc-related-section">
            <h2 className="nc-section-title text-center mb-4">You May Also Like</h2>
            <div className="row g-4">
              {relatedProducts.map((p) => (
                <div className="col-6 col-md-3" key={p.id}>
                  <Link to={`/product/${p.id}`} className="nc-related-card">
                    <div className="nc-related-img-wrap">
                      <img src={p.image} alt={p.name} loading="lazy" />
                    </div>
                    <div className="nc-related-info">
                      <h6>{p.name}</h6>
                      <span>{formatPrice(p.price)}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
