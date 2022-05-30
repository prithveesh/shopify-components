const variantSize = {
  '3-pack': 3,
  'One-pack': 1,
};

const ItemMeta = ({ item, product }) => {
  const meta = item.selling_plan_allocation
    ? 'Subscription Order'
    : 'One Time Order';

  let price = item.original_price;
  if (item.selling_plan_allocation) {
    price = item.selling_plan_allocation.compare_at_price;
  }
  const size = variantSize[item.variant_title] || 1;
  return (
    <>
      <p>
        ${parseFloat(price / 100).toFixed(2)} &#8226; {size} pack
      </p>
      <p>{meta}</p>
    </>
  );
};

export default ItemMeta;
