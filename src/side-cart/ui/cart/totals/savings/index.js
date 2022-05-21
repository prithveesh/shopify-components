import { useThemeSettings } from '../../../../store';

const Savings = ({ total_saving, total_discount, symbol }) => {
  const [{ display_savings }] = useThemeSettings();

  if (!display_savings || total_saving <= 0 || total_discount <= 0) return null;

  return (
    <li className="cart_discounts js-cart_discounts sale">
      <span className="right">
        <span className="money">
          {symbol}
          {total_saving + total_discount}
        </span>
      </span>
      <span>Savings</span>
    </li>
  );
};

export default Savings;
