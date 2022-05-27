import { CONTINUE_SHOPPING, EMPTY_CART } from '@partners/text';

export const EmptyCart = ({ onClose }) => {
  return (
    <div className="side-cart-empty">
      <p className="empty_cart">{EMPTY_CART}</p>
      <button
        type="button"
        className="global-button global-button--primary"
        onClick={onClose}
      >
        {CONTINUE_SHOPPING}
      </button>
    </div>
  );
};

export default EmptyCart;
