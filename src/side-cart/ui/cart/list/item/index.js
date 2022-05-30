import { useState } from 'react';
import ItemLayoutRenderer from '@partners/components/item-layout-renderer';
import {
  useActions,
  useCartLoading,
  useProduct,
  useUpsell,
} from '../../../../store';
import DeleteItem from './delete';
import ItemImage from './item-image';
import Quantity from './quantity';
import Price from './price';
import Title from './title';
import Upsell from './upsell';

const Item = ({ item, index }) => {
  const [, { onCartChange, onCartUpdate }] = useActions();
  const [isUpsell] = useUpsell(item);
  const [isLoading] = useCartLoading();
  const [isRemove, setRemove] = useState(false);
  const [product] = useProduct(item.handle);

  const handleRemove = () => setRemove(true);

  return (
    <li
      className={`mini-cart__item ${isRemove ? 'side-cart-slideout-item' : ''}`}
      data-cart-item
      data-line-id={index}
      data-variant-id={item.id}
    >
      <ItemImage image={item.image} alt={item.title} url={item.url} />
      <ItemLayoutRenderer
        product={product}
        item={item}
        line={index + 1}
        onCartChange={onCartChange}
        onCartUpdate={onCartUpdate}
        title={<Title item={item} />}
        quantity={
          <Quantity
            line={index + 1}
            id={item.id}
            variant={item.variant}
            quantity={item.quantity}
            onRemove={handleRemove}
          />
        }
        deleteItem={
          <DeleteItem
            isLoading={isLoading}
            onCartChange={onCartChange}
            line={index + 1}
            onRemove={handleRemove}
          />
        }
        price={<Price item={item} />}
        upsell={
          <Upsell
            onCartChange={onCartChange}
            isUpsell={isUpsell}
            item={item}
            line={index + 1}
            product={product}
          />
        }
      />
    </li>
  );
};

export default Item;
