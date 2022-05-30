export const hasSubscription = (product) => {
  if (!product) return false;
  const sellingPlanGroup = product.selling_plan_groups?.[0];
  return !!(sellingPlanGroup?.name === 'Remi Club');
};
export const showSuggestions = true;
export const showStrikePrice = false;
