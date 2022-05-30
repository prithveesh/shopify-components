import ItemUpSell from '@partners/components/item-upsell';

const Upsell = ({ onCartChange, isUpsell, item, line, product }) => {
  const handleChange = () => {
    let selling_plan = null;
    if (isUpsell) {
      const { variants } = product;
      const { id } = item;
      const variant = variants.find((variant) => id === variant.id);
      selling_plan = variant.selling_plan_allocations[0].selling_plan_id;
    }
    onCartChange({
      selling_plan,
      line,
      quantity: item.quantity,
    });
  };
  return <ItemUpSell isUpsell={isUpsell} handleChange={handleChange} />;
};

export default Upsell;
