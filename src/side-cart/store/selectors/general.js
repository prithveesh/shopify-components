import { createHook } from 'react-sweet-state';
import store from '../store';

export const useCurrency = createHook(store, {
  selector: () => {
    return window.Shopify.money_format;
  },
});

export const useThemeSettings = createHook(store, {
  selector: () => {
    return window.Shopify.theme_settings;
  },
});

export const useActions = createHook(store, {
  selector: (state) => null,
});
