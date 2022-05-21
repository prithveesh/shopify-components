export const EmptyCart = ({ onClose }) => {
  return (
    <div className="side-cart-empty">
      <p className="empty_cart">Empty Cart</p>
      <button
        type="button"
        className="global-button global-button--primary"
        onClick={onClose}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default EmptyCart;
