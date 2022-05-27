import { MiniCartStore } from './store';
import MainSideCart from './main';
import './style.css';

function SideCart() {
  return (
    <MiniCartStore>
      <MainSideCart />
    </MiniCartStore>
  );
}

window.openCartEvent = new Event('open-mini-cart');
window.closeCartEvent = new Event('close-mini-cart');

export default SideCart;
