import * as TEXT from '@partners/text';
import { useThemeSettings } from '../../../../store';

const Taxes = ({ taxes_included }) => {
  const [{ shipping_policy }] = useThemeSettings();

  let taxes_shipping_checkout = TEXT.TAXES_SHIPPING_CHECKOUT;
  if (taxes_included && shipping_policy?.body) {
    taxes_shipping_checkout = TEXT.TAXES_INCLUDED_SHIPPING_CHECKOUT(
      shipping_policy.url,
    );
  } else if (taxes_included) {
    taxes_shipping_checkout = TEXT.TAXES_INCLUDED;
  } else if (shipping_policy?.body) {
    taxes_shipping_checkout = TEXT.TAXES_N_SHIPPING_CHECKOUT(
      shipping_policy.url,
    );
  }
  return (
    <li className="hide-on-empty">
      <p className="cart-message meta">{taxes_shipping_checkout}</p>
    </li>
  );
};

export default Taxes;
