const ItemImage = ({ image, alt, url }) => {
  return (
    <a href={url}>
      <div className="cart_image mini-cart__item-image">
        <img src={image} alt={alt} className="lazyload" />
      </div>
    </a>
  );
};

export default ItemImage;
