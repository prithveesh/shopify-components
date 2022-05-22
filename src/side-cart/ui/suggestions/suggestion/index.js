import { useCurrency } from '../../../store';

const Suggestion = ({ product }) => {
  const [symbol, { onCartAdd }] = useCurrency();

  const handleClick = (product) => {
    onCartAdd(product.handle, 1);
  };

  let meta = '';
  let price = product.price;
  const sellingPlanGroups = product.selling_plan_groups?.[0];
  if (sellingPlanGroups?.name === 'Remi Club') {
    const sellingPlan = sellingPlanGroups.selling_plans[0];
    if (sellingPlan) {
      meta = sellingPlan.name;
      price = sellingPlan.price_adjustments[0].value;
    }
  }

  return (
    <div className="side-cart-suggestion">
      <img
        className="side-cart-suggestion-img"
        src={product.featured_image}
        alt={product.title}
      />
      <h3 className="side-cart-suggestion-title">{product.title}</h3>
      <p className="side-cart-suggestion-meta">{meta}</p>
      <p className="side-cart-suggestion-price">
        {symbol}
        {price / 100}
      </p>
      <button
        className="side-cart-suggestion-button global-button"
        onClick={() => handleClick(product)}
      >
        +Add
      </button>
    </div>
  );
};

export default Suggestion;
