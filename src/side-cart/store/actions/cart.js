import { getData, postData, postForm } from '../utils';

export const getCartData =
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
    });
  };

export const onCartAdd =
  (handle, quantity = 1) =>
  ({ setState, getState, dispatch }) => {
    const { [handle]: product } = getState();
    setState({
      isLoading: true,
    });
    const params = {
      id: product.data.id,
      quantity,
    };

    if (product.data.hasSubscription) {
      params.selling_plan = product.data.variants[1].selling_plan;
      params.purchase_option = product.data.variants[1].purchase_option;
    }

    postData('cart/add.js', {
      items: [params],
    }).then(() => {
      dispatch(getCartData());
    });
  };

export const onCartUpdate =
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
          item.variant_id === product.data.id && item.selling_plan_allocation
        );
      });

      if (itemToBeUpdated) {
        dispatch(
          onCartChange({
            id: itemToBeUpdated.key,
            quantity: itemToBeUpdated.quantity + itemToBeRemoved.quantity,
          }),
        );
      } else {
        dispatch(onCartAdd(itemToBeRemoved.handle, itemToBeRemoved.quantity));
      }
    });
  };

export const onCartChange =
  (params) =>
  ({ setState, dispatch }) => {
    postForm('cart/change.js', params).then((cart) => {
      setState({
        cart,
        isLoading: false,
      });
    });
  };

export const onCartClear =
  (params) =>
  ({ setState, getState }) => {};
