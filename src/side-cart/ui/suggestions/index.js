import { useProducts, useCurrency } from '../../store';
import Suggestion from './suggestion';

const Suggestions = () => {
  const [products, { onCartAdd }] = useProducts();
  const [symbol] = useCurrency();

  const handleClick = (product) => {
    onCartAdd(product.handle, 1);
  };

  if (!products?.length) return null;

  return (
    <div className="side-cart-suggestions-wrapper">
      <h3 className="side-cart-suggestions-heading">You May Also Like</h3>
      <div
        className={`side-cart-suggestions-list ${
          products.length > 2 ? 'two' : ''
        }`}
      >
        {products.map((product, index) => (
          <Suggestion product={product} key={`${product.key}:${index}`} />
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
