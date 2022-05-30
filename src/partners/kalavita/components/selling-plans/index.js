const SellingPlans = ({ product, item, onCartChange, line }) => {
  if (!item.selling_plan_allocation) return null;
  const { variants } = product;
  const { id } = item;
  const variant = variants.find((variant) => id === variant.id);

  const onChange = (event) => {
    onCartChange({
      line,
      selling_plan: event.target.value,
    });
  };

  return (
    <select
      onChange={onChange}
      defaultValue={item.selling_plan_allocation.selling_plan.id}
    >
      {variant.selling_plan_allocations.map((plan) => (
        <option key={plan.selling_plan_id} value={plan.selling_plan_id}>
          {plan.selling_plan_name}
        </option>
      ))}
    </select>
  );
};

export default SellingPlans;
