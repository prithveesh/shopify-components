export const hasSubscription = (product) => {
  return !!product?.selling_plan_groups?.length;
};

export const showSuggestions = false;
export const showStrikePrice = true;
