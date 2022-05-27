import { useThemeSettings } from '../../../../store';

const Taxes = ({ taxes_included }) => {
  const [{ shipping_policy }] = useThemeSettings();

  let taxes_shipping_checkout = 'Taxes and shipping calculated at checkout';
  if (taxes_included && shipping_policy?.body) {
    taxes_shipping_checkout = `Tax included. <a href="${shipping_policy.url}">Shipping</a> calculated at checkout.`;
  } else if (taxes_included) {
    taxes_shipping_checkout =
      'Tax included and shipping calculated at checkout';
  } else if (shipping_policy?.body) {
    taxes_shipping_checkout = `Taxes and <a href="${shipping_policy.url}">shipping</a> calculated at checkout`;
  }
  return (
    <li className="hide-on-empty">
      <p className="cart-message meta">{taxes_shipping_checkout}</p>
    </li>
  );
};

export default Taxes;
