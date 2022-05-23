import { createHook } from 'react-sweet-state';
import store from '../store';

export const useCart = createHook(store, {
  selector: (state) => {
    return state.cart;
  },
});

export const useCartLoading = createHook(store, {
  selector: (state) => {
    return state.isLoading;
  },
});

export const useIsEmpty = createHook(store, {
  selector: (state) => {
    return !state.cart?.items?.length;
  },
});

export const useCartList = createHook(store, {
  selector: (state) => {
    return state.cart?.items;
  },
});

export const useUpsell = createHook(store, {
  selector: (state, item) => {
    const { handle } = item;
    const { [handle]: product } = state;
    if (item.selling_plan_allocation) return false;
    if (product?.data.hasSubscription) {
      return product.data.variants[1].selling_plan;
    }

    return false;
  },
});
