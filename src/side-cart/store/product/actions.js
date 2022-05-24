import { getData } from '../utils';
import { PRODUCTS } from '../contants';
export const getProducts =
  () =>
  ({ dispatch, getState }) => {
    const { products } = getState();
    dispatch(getProductsByHandle(products));
  };

export const getProductsByHandle =
  (handles) =>
  ({ dispatch }) => {
    const uniqueHandles = new Set(handles);
    uniqueHandles.forEach((handle) => dispatch(getProductHandle(handle)));
  };

const parseProductData = (res) => {
  const product = res;
  const sellingPlanGroup = product.selling_plan_groups?.[0];
  product.data = {
    id: product.variants[0].id,
    hasSubscription: !!(sellingPlanGroup?.name === 'Remi Club'),
    variants: [
      {
        selling_plan: undefined,
        purchase_option: undefined,
        price: product.price / 100,
        meta: undefined,
      },
    ],
    ...PRODUCTS[product.handle],
  };

  if (product.data.hasSubscription) {
    const sellingPlan = sellingPlanGroup.selling_plans[0];
    if (sellingPlan) {
      product.data.variants.push({
        selling_plan: sellingPlanGroup.selling_plans[0].id,
        purchase_option:
          product.variants[0].selling_plan_allocations[0].selling_plan_group_id,
        price:
          sellingPlanGroup.selling_plans[0].price_adjustments[0].value / 100,
        meta: sellingPlanGroup.selling_plans[0].name,
      });
    }
  }

  return product;
};

export const getProductHandle =
  (handle) =>
  ({ setState, getState }) => {
    const state = getState();
    if (handle in state) return;
    setState({
      [handle]: null,
    });
    getData(`products/${handle}.js`).then((res) => {
      setState({
        [handle]: parseProductData(res),
      });
    });
  };
