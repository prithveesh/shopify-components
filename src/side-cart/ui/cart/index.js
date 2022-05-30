import ProgressBar from '@partners/components/progress-bar';
import CartList from './list';
import { useCart } from '../../store';
import Totals from './totals';
import Buttons from './buttons';

export const Cart = () => {
  const [cart] = useCart();
  return (
    <>
      <ProgressBar cart={cart} />
      <form
        action="/cart"
        method="post"
        className="side-cart-form"
        data-total-discount={cart.total_discount}
        data-shop-currency={cart.currency}
        data-shop-name="Remi"
        data-cart-form="mini-cart"
      >
        <CartList />

        <ul className="side-cart-footer">
          <Totals />
          <Buttons />
        </ul>
      </form>
    </>
  );
};

export default Cart;
