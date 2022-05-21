import { useThemeSettings, useCart } from '../../../store/index';

const Buttons = ({}) => {
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
        <textarea id="note" name="note" rows="2" placeholder="Order Notes">
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

          <label className="tos_label">
            I Agree with the Terms & Conditions
          </label>

          {tos_page && (
            <a href={tos_page} target="_blank" className="tos_icon">
              [View Terms]
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
          Proceed to Checkout →
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
          Go to cart{' '}
        </button>
      )}
    </li>
  );
};

export default Buttons;
