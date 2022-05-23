import { createHook } from 'react-sweet-state';
import store from '../store';

export const useProducts = createHook(store, {
  selector: (state) => {
    const { cart, products } = state;
    return products.reduce((list, handle) => {
      const product = state[handle];
      if (cart?.items.find((item) => item.handle === handle)) {
        return list;
      }
      if (product) {
        list.push(product);
      }
      return list;
    }, []);
  },
});
