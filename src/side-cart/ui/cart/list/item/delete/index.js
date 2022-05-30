import ItemDelete from '@partners/components/item-delete';

const Delete = ({ line, onRemove, onCartChange, isLoading }) => {
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
      <ItemDelete />
    </a>
  );
};

export default Delete;
