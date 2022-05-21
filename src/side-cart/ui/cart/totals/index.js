import Discounts from './discounts';
import { useCart, useCurrency } from '../../../store';
import SubTotal from './sub-total';
import Savings from './savings';
import Taxes from './taxes';

const Totals = () => {
  const [symbol] = useCurrency();
  const [
    {
      cart_level_discount_applications,
      total_price,
      total_saving,
      total_discount,
      taxes_included,
    },
  ] = useCart();
  return (
    <>
      <Discounts
        symbol={symbol}
        cart_level_discount_applications={cart_level_discount_applications}
      />
      <SubTotal symbol={symbol} total_price={total_price} />
      <Savings
        symbol={symbol}
        total_saving={total_saving}
        total_discount={total_discount}
      />
      <Taxes taxes_included={taxes_included} />
    </>
  );
};

export default Totals;
