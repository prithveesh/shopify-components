import { FREE } from '@partners/text';
import { useCurrency } from '../../../../../store';

const Price = ({ item }) => {
  const [symbol] = useCurrency();
  if (item.price <= 0) return FREE;

  const isSale =
    item.price < item.variant?.compare_at_price ||
    item.line_level_discount_allocations?.size > 0;

  return (
    <>
      <span className={`money ${isSale ? 'sale' : ''}`}>
        {symbol}
        {item.final_price / 100}
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
