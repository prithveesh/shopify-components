import DeleteItem from './delete';
import ItemImage from './item-image';
import Quantity from './quantity';
import Price from './price';
import Title from './title';
import { useState } from 'react';
import UpSell from './upsell/index';

const Item = ({ item, index }) => {
  const [isRemove, setRemove] = useState(false);

  const handleRemove = () => setRemove(true);

  return (
    <li
      className={`mini-cart__item ${isRemove ? 'side-cart-slideout-item' : ''}`}
      data-cart-item
      data-line-id={index}
      data-variant-id={item.id}
    >
      <ItemImage image={item.image} alt={item.title} url={item.url} />
      <div className="mini-cart__item-content">
        <Title item={item} />
        <Quantity
          line={index + 1}
          id={item.id}
          variant={item.variant}
          quantity={item.quantity}
          onRemove={handleRemove}
        />
      </div>
      <div className="mini-cart__item-price">
        <DeleteItem line={index + 1} onRemove={handleRemove} />
        <Price item={item} />
      </div>
      <UpSell item={item} line={index + 1} />
    </li>
  );
};

export default Item;
