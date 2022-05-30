import * as TEXT from '@partners/text';
import { showStrikePrice } from '@partners/conditions';
import { useCurrency } from '../../../../../store';

const Price = ({ item }) => {
  const [symbol] = useCurrency();
  if (item.price <= 0) return TEXT.FREE;

  const isSale =
    item.price < item.variant?.compare_at_price ||
    item.line_level_discount_allocations?.size > 0;

  const strikePrice =
    showStrikePrice && item.selling_plan_allocation?.compare_at_price;

  return (
    <>
      <span className={`money ${isSale ? 'sale' : ''}`}>
        {symbol}
        {item.final_price / 100}
        {strikePrice && (
          <>
            {' '}
            <span className="money strike">
              {symbol}
              {parseFloat(strikePrice / 100).toFixed(2)}
            </span>
          </>
        )}
      </span>
      {isSale && (
        <span className="money was_price">
          {symbol}
          {item.variant?.compare_at_price}
        </span>
      )}
      {item.line_level_discount_allocations?.map((discount_allocation) => (
        <p className="notification-discount meta">
          {discount_allocation.discount_application.title}
        </p>
      ))}
    </>
  );
};

export default Price;
