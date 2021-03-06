import * as TEXT from '@partners/text';
const SubTotal = ({ total_price, symbol }) => {
  return (
    <li className="cart_subtotal js-cart_subtotal">
      <span className="right">
        <span className="money">
          {symbol}
          {parseInt(total_price / 100)}
        </span>
      </span>

      <span>{TEXT.SUBTOTAL}</span>
    </li>
  );
};

export default SubTotal;
