import {
  ORDER_NOTES,
  TERMS_N_CONDITION,
  VIEW_TERMS,
  PROCEED_TO_CHECKOUT,
  GO_TO_CART,
} from '@partners/text';
import { useThemeSettings, useCart } from '../../../store/index';

const Buttons = () => {
  const [{ note }] = useCart();
  const [
    {
      display_special_instructions,
      go_to_checkout,
      display_tos_checkbox,
      tos_page,
      cart_message,
      show_lock_icon,
    },
  ] = useThemeSettings();

  return (
    <li className="side-cart-buttons">
      {display_special_instructions && go_to_checkout && (
        <textarea id="note" name="note" rows="2" placeholder={ORDER_NOTES}>
          {note}
        </textarea>
      )}

      {display_tos_checkbox && go_to_checkout && (
        <p className="tos">
          <input
            type="checkbox"
            className="tos_agree"
            id="sliding_agree"
            required
          />

          <label className="tos_label">{TERMS_N_CONDITION}</label>

          {tos_page && (
            <a
              href={tos_page}
              target="_blank"
              className="tos_icon"
              rel="noreferrer"
            >
              {VIEW_TERMS}
            </a>
          )}
        </p>
      )}

      {cart_message && <div className="cart_text">{cart_message}</div>}

      {go_to_checkout ? (
        <button
          type="submit"
          name="checkout"
          className="global-button global-button--primary add_to_cart"
          data-minicart-checkout-button
        >
          {PROCEED_TO_CHECKOUT}
        </button>
      ) : (
        <button
          type="submit"
          className="global-button global-button--primary add_to_cart"
          data-minicart-checkout-button
        >
          {show_lock_icon && go_to_checkout && (
            <span className="icon-lock"></span>
          )}
          {GO_TO_CART}{' '}
        </button>
      )}
    </li>
  );
};

export default Buttons;
