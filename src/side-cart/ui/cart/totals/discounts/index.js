const Discounts = ({ cart_level_discount_applications, symbol }) => {
  if (!cart_level_discount_applications?.length) return null;

  return (
    <li className="cart_discounts js-cart_discounts sale">
      {cart_level_discount_applications.map((discount_application) => (
        <>
          <span className="cart_discounts--title">
            {discount_application.title}
          </span>
          <span className="cart_discounts--price">
            -
            <span className="money">
              {symbol}
              {discount_application.total_allocated_amount}
            </span>
          </span>
        </>
      ))}
    </li>
  );
};

export default Discounts;
