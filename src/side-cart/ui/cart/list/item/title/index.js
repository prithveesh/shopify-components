import ItemMeta from '@partners/components/item-meta';
import { useProduct } from '../../../../../store';

const Title = ({ item }) => {
  const [product] = useProduct(item.handle);

  return (
    <div className="mini-cart__item-title">
      <a href={item.url}>{item.title}</a>
      {product?.data?.hasSubscription && (
        <p className="meta">
          <ItemMeta item={item} product={product} />
        </p>
      )}
    </div>
  );
};

export default Title;
