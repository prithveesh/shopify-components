const ItemLayoutRenderer = ({
  title,
  quantity,
  deleteItem,
  price,
  isUpsell,
  upsell,
}) => {
  return (
    <>
      <div className="mini-cart__item-content">
        {title}
        {quantity}
      </div>
      <div className="mini-cart__item-price">
        {deleteItem}
        {price}
      </div>
      {isUpsell && upsell}
    </>
  );
};

export default ItemLayoutRenderer;
