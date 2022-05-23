import { createContainer } from 'react-sweet-state';
import store from './store';

const MiniCartStore = createContainer(store, {
  onInit:
    () =>
    ({ dispatch }, props) => {
      dispatch(store.actions.getCartData());
      dispatch(store.actions.getProducts());
    },
});

export default MiniCartStore;
