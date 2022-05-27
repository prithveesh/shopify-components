import EmptyCart from './empty-cart';
import { Cart } from './cart';
import { useIsEmpty } from '../store';

function MainSideCartContainer({ onClose }) {
  const [isEmpty] = useIsEmpty();
  if (isEmpty) {
    <EmptyCart onClose={onClose} />;
  }
  return <Cart />;
}

export default MainSideCartContainer;
