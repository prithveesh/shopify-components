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

export const useHasSwap = createHook(store, {
  selector: (state, product) => {
    if (!product) return null;
    const { handle } = product;
    const {
      cart: { items },
    } = state;
    if (product.data.hasSubscription) {
      const index = items.findIndex(
        (item) => item.handle === handle && !item.selling_plan_allocation,
      );
      if (index > -1) {
        return { item: items[index], line: index + 1 };
      }
    }
    return null;
  },
});
