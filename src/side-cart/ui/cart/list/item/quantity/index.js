import { useState, useCallback, useEffect } from 'react';
import { useActions } from '../../../../../store';
import Plus from './plus.svg';
import Minus from './minus.svg';

const Quantity = ({ id, quantity, variant, line, onRemove }) => {
  const [qty, setQty] = useState(quantity);

  const [, { onCartChange }] = useActions();

  const onMinus = useCallback(() => {
    setQty((value) => {
      if (value === 1) onRemove();
      else {
        onCartChange({
          quantity: value - 1,
          line,
        });
      }
      return value - 1;
    });
  }, [onRemove, line, onCartChange]);

  const onPlus = useCallback(() => {
    setQty((value) => {
      onCartChange({
        quantity: value + 1,
        line,
      });
      return value + 1;
    });
  }, [line, onCartChange]);

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
