import { FULL_PRICE } from '@partners/text';
import { useProduct } from '../../../../../store';

const Title = ({ item }) => {
  const [product] = useProduct(item.handle);
  const meta =
    item.selling_plan_allocation?.selling_plan?.name ||
    (product?.data?.hasSubscription && FULL_PRICE) ||
    null;
  return (
    <div className="mini-cart__item-title">
      <a href={item.url}>{item.title}</a>
      {meta && <p className="meta">{meta}</p>}
    </div>
  );
};

export default Title;
