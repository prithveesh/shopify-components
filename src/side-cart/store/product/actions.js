import { PRODUCTS } from '@partners/constants';
import { hasSubscription } from '@partners/conditions';
import { getData } from '../utils';

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

export const parseSellingPlans = (product) => {
  const { variants, selling_plan_groups } = product;
  const { selling_plans } = selling_plan_groups[0];
  variants.forEach((variant) => {
    variant.selling_plan_allocations.forEach((allocatedSellingPlan) => {
      const sellingPlan = selling_plans.find(
        (plan) => plan.id === allocatedSellingPlan.selling_plan_id,
      );
      if (sellingPlan) {
        allocatedSellingPlan.selling_plan_name = sellingPlan.name;
      }
    });
  });
  return product;
};

const parseProductData = (res) => {
  if (!res?.variants) return null;
  const product = parseSellingPlans(res);
  const sellingPlanGroup = product.selling_plan_groups?.[0];
  product.data = {
    id: product.variants[0].id,
    hasSubscription: hasSubscription(product),
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
