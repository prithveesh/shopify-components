const Title = ({ item }) => {
  return (
    <div className="mini-cart__item-title">
      <a href={item.url}>{item.title}</a>
      {item.selling_plan_allocation?.selling_plan?.name && (
        <p className="meta">{item.selling_plan_allocation.selling_plan.name}</p>
      )}
    </div>
  );
};

export default Title;
