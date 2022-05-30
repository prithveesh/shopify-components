import SellingPlans from '../selling-plans';

const ItemLayoutRenderer = ({
  product,
  item,
  line,
  title,
  quantity,
  deleteItem,
  price,
  upsell,
  onCartChange,
}) => {
  return (
    <>
      <div className="mini-cart__item-content">
        {title}
        {deleteItem}
      </div>
      <div className="mini-cart__item-price">
        {price}
        <SellingPlans
          line={line}
          product={product}
          item={item}
          onCartChange={onCartChange}
        />
        {quantity}
      </div>
      {upsell}
    </>
  );
};

export default ItemLayoutRenderer;
