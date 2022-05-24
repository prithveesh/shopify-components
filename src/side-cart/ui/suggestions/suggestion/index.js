import { useCurrency, useHasSwap } from '../../../store';

const Suggestion = ({ product }) => {
  const [symbol, { onCartAdd, onCartUpdate }] = useCurrency();
  let [swapWith] = useHasSwap(product);

  const handleClick = () => {
    if (swapWith) {
      onCartUpdate({ ...swapWith });
    } else {
      onCartAdd(product.handle, 1);
    }
  };

  let meta = '';
  let price = product.price / 100;
  if (product.data.hasSubscription) {
    meta = product.data.variants[1].meta;
    price = product.data.variants[1].price;
  }

  return (
    <div className={`side-cart-suggestion ${swapWith ? 'best-deal' : ''}`}>
      <img
        className="side-cart-suggestion-img"
        src={product.featured_image}
        alt={product.title}
      />
      <h3 className="side-cart-suggestion-title">{product.title}</h3>
      <span className="side-cart-suggestion-rating">
        <span className="side-cart-suggestion-stars"></span>
        {product.data.stars} reviews
      </span>
      <p className="side-cart-suggestion-meta">{meta}</p>
      <p className="side-cart-suggestion-price">
        {symbol}
        {price}
      </p>
      <button
        className="side-cart-suggestion-button global-button"
        onClick={() => handleClick(product)}
      >
        {swapWith ? 'Swap' : '+Add'}
      </button>
    </div>
  );
};

export default Suggestion;
