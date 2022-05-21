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
    (params) =>
    ({ setState, getState }) => {},
  onCartUpdate:
    ({ item: itemToBeRemoved, line }) =>
    ({ setState, dispatch, getState }) => {
      const {
        [itemToBeRemoved.handle]: product,
        cart: { items },
      } = getState();

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

        let updatePromise;
        if (itemToBeUpdated) {
          updatePromise = postData('cart/change.js', {
            id: itemToBeUpdated.key,
            quantity: itemToBeUpdated.quantity + itemToBeRemoved.quantity,
          });
        } else {
          updatePromise = postData('cart/add.js', {
            items: [
              {
                selling_plan:
                  product.selling_plan_groups[0].selling_plans[0].id,
                purchase_option:
                  product.variants[0].selling_plan_allocations[0]
                    .selling_plan_group_id,
                id: product.variants[0].id,
                quantity: itemToBeRemoved.quantity,
              },
            ],
          });
        }
        updatePromise.then((cart) => {
          dispatch(cartActions.getCartData());
        });
      });
    },
  onCartChange:
    (params) =>
    ({ setState, dispatch }) => {
      console.log(params);
      postForm('cart/change.js', params).then((cart) => {
        // dispatch(cartActions.getCartData());
        setState({
          cart,
        });
      });
    },
  onCartClear:
    (params) =>
    ({ setState, getState }) => {},
};

const productActions = {
  getAllProducts:
    () =>
    ({ setState, getState }) => {
      getData('products.json').then((res) => {
        setState({
          products: res.products,
        });
      });
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
    products: null,
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
  selector: (state) => state.products,
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
