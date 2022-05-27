import { PRODUCTS_HANDLES } from '@partners/constants';
import { createStore } from 'react-sweet-state';
import * as cartActions from './cart/actions';
import * as productActions from './product/actions';
//Store
const store = createStore({
  initialState: {
    products: PRODUCTS_HANDLES,
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
