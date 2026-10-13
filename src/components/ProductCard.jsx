import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";

// ProductCard is a reusable card that shows a product image, name,
// price, and an Add to Cart button. Used on the Home and Products pages.

function ProductCard({ product }) {
  const { addToCart } = useCart();

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  }

  return (
    <div className="card nc-product-card h-100">
      <Link to={`/product/${product.id}`} className="nc-product-card-link">
        <div className="nc-product-img-wrap">
          {product.badge && (
            <span className="nc-product-badge">{product.badge}</span>
          )}
          {product.oldPrice && (
            <span className="nc-product-discount">
              {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
            </span>
          )}
          <img
            src={product.image}
            className="card-img-top nc-product-img"
            alt={product.name}
            loading="lazy"
          />
        </div>
        <div className="card-body nc-product-body">
          <p className="nc-product-category">{product.category}</p>
          <h6 className="card-title nc-product-name">{product.name}</h6>
          <div className="nc-product-rating">
            <i className="bi bi-star-fill"></i>
            <span>{product.rating}</span>
          </div>
          <div className="nc-product-price-row">
            <span className="nc-product-price">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="nc-product-old-price">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
        </div>
      </Link>
      <div className="nc-product-card-footer">
        <button className="btn nc-btn-dark w-100" onClick={handleAddToCart}>
          <i className="bi bi-bag-plus me-1"></i> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
