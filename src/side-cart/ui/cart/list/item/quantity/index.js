import { useState, useCallback } from 'react';
import { useActions, useCartLoading } from '../../../../../store';
import Plus from './plus.svg';
import Minus from './minus.svg';

const Quantity = ({ id, quantity, variant, line, onRemove }) => {
  const [qty, setQty] = useState(quantity);
  const [isLoading] = useCartLoading();
  const [, { onCartChange }] = useActions();

  const onMinus = useCallback(() => {
    if (isLoading) return;
    setQty((value) => {
      if (value === 1) onRemove();
      onCartChange({
        quantity: value - 1,
        line,
      });
      return value - 1;
    });
  }, [onRemove, line, onCartChange, isLoading]);

  const onPlus = useCallback(() => {
    if (isLoading) return;
    setQty((value) => {
      onCartChange({
        quantity: value + 1,
        line,
      });
      return value + 1;
    });
  }, [line, onCartChange, isLoading]);

  return (
    <div className="product-quantity-box">
      <span
        onClick={onMinus}
        className="qty-icons product-minus"
        data-func="minus"
      >
        <Minus />
      </span>
      <input
        type="number"
        min="0"
        size="2"
        className="quantity"
        name="updates[]"
        id={`updates_${id}`}
        value={qty}
        max={variant?.inventory_quantity}
        onChange={() => {}}
      />
      <span
        onClick={onPlus}
        className="qty-icons product-plus"
        data-func="plus"
      >
        <Plus />
      </span>
    </div>
  );
};

export default Quantity;
