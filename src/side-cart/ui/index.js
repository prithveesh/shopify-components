import { useCallback, useEffect } from 'react';
import EmptyCart from './empty-cart';
import { Cart } from './cart';
import { useCartLoading, useIsEmpty, useActions, useCart } from '../store';
import Loader from './loader';
import Suggestions from './suggestions';

function SideCartContainer({ isOpen, onClose }) {
  const [isLoading] = useCartLoading();
  const [cart] = useCart();
  const [isEmpty] = useIsEmpty();
  const [, { getCartData }] = useActions();

  const loadCart = useCallback(() => {
    if (isEmpty) {
      return <EmptyCart onClose={onClose} />;
    }
    return <Cart />;
  }, [isEmpty, onClose]);

  useEffect(() => {
    if (!isLoading && cart !== null) {
      getCartData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`side-cart-wrapper ${isOpen ? 'active_link' : ''}`}>
      <div className="side-cart-overlay" onClick={onClose}></div>
      <div className="side-cart">
        <div className="side-cart-cover">
          <div className="side-cart-container">
            <div className="side-cart-header">
              <h4>Your Cart</h4>
              <span className="side-cart-close" onClick={onClose}>
                ✕
              </span>
            </div>
            {isLoading ? <Loader /> : loadCart()}
          </div>
          <Suggestions />
        </div>
      </div>
    </div>
  );
}

export default SideCartContainer;
