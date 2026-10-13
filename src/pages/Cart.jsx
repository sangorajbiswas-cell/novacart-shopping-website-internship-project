import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";

// The Cart page shows all items the customer has added.
// Each item has quantity controls and a remove button.
// The subtotal, shipping, and total are shown at the bottom.

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartSubtotal } =
    useCart();

  const shipping = cartSubtotal > 999 || cartSubtotal === 0 ? 0 : 99;
  const total = cartSubtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container py-5">
        <div className="nc-empty-state nc-cart-empty">
          <i className="bi bi-bag nc-empty-icon"></i>
          <h4>Your Cart is Empty</h4>
          <p>Looks like you have not added any products yet.</p>
          <Link to="/products" className="btn nc-btn-dark btn-lg">
            <i className="bi bi-bag me-1"></i> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="nc-page-wrapper">
      <div className="container py-4">
        <div className="nc-page-header">
          <h1 className="nc-page-title">Shopping Cart</h1>
          <p className="nc-page-subtitle">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="row g-4">
          {/* Cart Items List */}
          <div className="col-lg-8">
            <div className="nc-cart-items">
              {cartItems.map((item) => (
                <div className="nc-cart-item" key={item.key}>
                  <div className="nc-cart-item-img">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="nc-cart-item-info">
                    <h6 className="nc-cart-item-name">
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </h6>
                    <p className="nc-cart-item-meta">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="nc-cart-item-price">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="nc-cart-item-qty">
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <i className="bi bi-dash-lg"></i>
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <i className="bi bi-plus-lg"></i>
                    </button>
                  </div>

                  <div className="nc-cart-item-total">
                    {formatPrice(item.price * item.quantity)}
                  </div>

                  <button
                    className="nc-cart-item-remove"
                    onClick={() => removeFromCart(item.key)}
                    aria-label="Remove item"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              ))}
            </div>

            <div className="nc-cart-actions">
              <Link to="/products" className="btn nc-btn-outline">
                <i className="bi bi-arrow-left me-1"></i> Continue Shopping
              </Link>
              <button className="btn nc-btn-text-danger" onClick={clearCart}>
                <i className="bi bi-trash me-1"></i> Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="nc-cart-summary">
              <h5 className="nc-summary-title">Order Summary</h5>

              <div className="nc-summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>

              <div className="nc-summary-row">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="nc-free-shipping">FREE</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>

              {shipping > 0 && (
                <div className="nc-summary-shipping-note">
                  Add {formatPrice(1000 - cartSubtotal)} more for FREE shipping!
                </div>
              )}

              <hr className="nc-summary-divider" />

              <div className="nc-summary-total-row">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <p className="nc-summary-tax-note">Including all taxes</p>

              <button className="btn nc-btn-dark btn-lg w-100 nc-checkout-btn">
                Proceed to Checkout <i className="bi bi-arrow-right ms-1"></i>
              </button>

              <div className="nc-summary-trust">
                <i className="bi bi-shield-check"></i>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
