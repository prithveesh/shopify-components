import { useActions, useCartLoading } from '../../../../../store';
import DeleteIcon from './delete.svg';

const DeleteItem = ({ line, onRemove }) => {
  const [, { onCartChange }] = useActions();
  const [isLoading] = useCartLoading();

  const onClick = (event) => {
    event.preventDefault();
    if (isLoading) return;
    onRemove();
    onCartChange({
      quantity: 0,
      line,
    });
  };

  return (
    <a
      href={`/cart/change?line=${line}&quantity=0`}
      className="cart__remove-btn"
      data-line-id={`${line}`}
      onClick={onClick}
    >
      <DeleteIcon />
    </a>
  );
};

export default DeleteItem;
