import { useCartList } from '../../../store';
import Item from './item';

const CartList = () => {
  const [items] = useCartList();

  if (!items) return null;
  return (
    <ul className="cart_items js-cart_items">
      {items.map((item, index) => (
        <Item item={item} index={index} key={`${item.key}:${item.quantity}`} />
      ))}
    </ul>
  );
};

export default CartList;
