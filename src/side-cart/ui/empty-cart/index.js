import * as TEXT from '@partners/text';

export const EmptyCart = ({ onClose }) => {
  return (
    <div className="side-cart-empty">
      <p className="empty_cart">{TEXT.EMPTY_CART}</p>
      <button
        type="button"
        className="global-button global-button--primary"
        onClick={onClose}
      >
        {TEXT.CONTINUE_SHOPPING}
      </button>
    </div>
  );
};

export default EmptyCart;
