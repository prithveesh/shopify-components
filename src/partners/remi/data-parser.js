export const parseSellingPlans = (product) => {
  const { variants, selling_plan_groups } = product;
  const { selling_plans } = selling_plan_groups;
  variants.selling_plan_allocations.forEach((allocatedSellingPlan) => {
    const sellingPlan = selling_plans.find(
      (plan) => plan.id === allocatedSellingPlan.selling_plan_id,
    );
    if (sellingPlan) {
      allocatedSellingPlan.selling_plan_name = sellingPlan.name;
    }
  });
};
