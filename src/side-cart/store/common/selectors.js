import { createHook } from 'react-sweet-state';
import store from '../store';

export const useCurrency = createHook(store, {
  selector: () => {
    return window.Shopify.money_format || '$';
  },
});

export const useThemeSettings = createHook(store, {
  selector: () => {
    return (
      window.Shopify.theme_settings || {
        display_special_instructions: false,
        go_to_checkout: false,
        display_tos_checkbox: false,
        tos_page: null,
        cart_message: null,
        show_lock_icon: false,
        display_savings: false,
        shipping_policy: null,
      }
    );
  },
});

export const useActions = createHook(store, {
  selector: (state) => null,
});
