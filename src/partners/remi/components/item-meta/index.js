const ItemMeta = ({ item }) => {
  return item.selling_plan_allocation?.selling_plan?.name || 'Pay Full Price';
};

export default ItemMeta;
