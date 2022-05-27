import { createHook } from 'react-sweet-state';
import store from '../store';

export const useProduct = createHook(store, {
  selector: (state, handle) => {
    const { [handle]: product } = state;
    return product;
  },
});

export const useProductSuggestions = createHook(store, {
  selector: (state) => {
    const { cart, products } = state;
    return products.reduce((list, handle) => {
      const product = state[handle];
      if (!product) return list;
      if (
        cart?.items.find(
          (item) =>
            (item.handle === handle &&
              (item.selling_plan_allocation ||
                !product.data.hasSubscription)) ||
            product?.data.suggestionExceptions?.indexOf(item.handle) > -1,
        )
      ) {
        return list;
      }
      if (product) {
        list.push(product);
      }
      return list;
    }, []);
  },
});
