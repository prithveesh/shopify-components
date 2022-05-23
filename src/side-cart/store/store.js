import { createStore } from 'react-sweet-state';
import * as cartActions from './actions/cart';
import * as productActions from './actions/product';
//Store
const store = createStore({
  initialState: {
    products: [
      'custom-night-guard',
      'custom-teeth-whitening-kit',
      'whitening-gel',
      'whiteningfoam',
    ],
    cart: null,
    isLoading: true,
  },
  actions: {
    ...cartActions,
    ...productActions,
  },
  name: 'mini-cart-store',
});

export default store;
