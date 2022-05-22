import { createStore, createContainer, createHook } from 'react-sweet-state';
import { getData, postData, postForm } from './utils';

// actions
const cartActions = {
  getCartData:
    () =>
    ({ setState, dispatch }) => {
      setState({
        isLoading: true,
      });
      getData('cart.json').then((cart) => {
        setState({
          cart,
          isLoading: false,
        });
        dispatch(
          productActions.getProductsByHandle(
            cart.items?.map((item) => item.handle),
          ),
        );
      });
    },
  onCartAdd:
    (handle, quantity = 1) =>
    ({ setState, getState, dispatch }) => {
      const { [handle]: product } = getState();
      setState({
        isLoading: true,
      });
      const params = {
        id: product.variants[0].id,
        quantity,
      };

      if (product.selling_plan_groups?.[0]?.name === 'Remi Club') {
        params.selling_plan =
          product.selling_plan_groups[0].selling_plans[0].id;
        params.purchase_option =
          product.variants[0].selling_plan_allocations[0].selling_plan_group_id;
      }

      postData('cart/add.js', {
        items: [params],
      }).then(() => {
        dispatch(cartActions.getCartData());
      });
    },
  onCartUpdate:
    ({ item: itemToBeRemoved, line }) =>
    ({ dispatch, getState, setState }) => {
      const {
        [itemToBeRemoved.handle]: product,
        cart: { items },
      } = getState();
      setState({
        isLoading: true,
      });
      postData('cart/change.js', {
        line,
        quantity: 0,
      }).then(() => {
        const itemToBeUpdated = items.find((item) => {
          return (
            item.variant_id === product.variants[0].id &&
            item.selling_plan_allocation
          );
        });

        if (itemToBeUpdated) {
          dispatch(
            cartActions.onCartChange({
              id: itemToBeUpdated.key,
              quantity: itemToBeUpdated.quantity + itemToBeRemoved.quantity,
            }),
          );
        } else {
          dispatch(
            cartActions.onCartAdd(
              itemToBeRemoved.handle,
              itemToBeRemoved.quantity,
            ),
          );
        }
      });
    },
  onCartChange:
    (params) =>
    ({ setState, dispatch }) => {
      postForm('cart/change.js', params).then((cart) => {
        setState({
          cart,
          isLoading: false,
        });
      });
    },
  onCartClear:
    (params) =>
    ({ setState, getState }) => {},
};

const productActions = {
  getProducts:
    () =>
    ({ dispatch, getState }) => {
      const { products } = getState();
      dispatch(productActions.getProductsByHandle(products));
    },
  getProductsByHandle:
    (handles) =>
    ({ dispatch }) => {
      const uniqueHandles = new Set(handles);
      uniqueHandles.forEach((handle) =>
        dispatch(productActions.getProductHandle(handle)),
      );
    },
  getProductHandle:
    (handle) =>
    ({ setState, getState }) => {
      const state = getState();
      if (handle in state) return;
      setState({
        [handle]: null,
      });
      getData(`products/${handle}.js`).then((res) => {
        setState({
          [handle]: res,
        });
      });
    },
};

//Store
export const store = createStore({
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

export const MiniCartStore = createContainer(store, {
  onInit:
    () =>
    ({ setState, dispatch }, props) => {
      dispatch(store.actions.getCartData());
      dispatch(store.actions.getProducts());
    },
});

//Selectors
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

export const useProducts = createHook(store, {
  selector: (state) => {
    return state.products.reduce((list, handle) => {
      if (state[handle]) {
        list.push(state[handle]);
      }
      return list;
    }, []);
  },
});

export const useUpsell = createHook(store, {
  selector: (state, item) => {
    const { handle } = item;
    const { [handle]: product } = state;
    if (item.selling_plan_allocation) return false;
    if (
      product?.selling_plan_groups?.[0].selling_plans?.[0].price_adjustments
        .length > 1
    ) {
      return product?.selling_plan_groups[0].selling_plans[0].id;
    }

    return false;
  },
});
