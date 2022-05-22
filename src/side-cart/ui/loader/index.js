/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
const Loader = () => {
  const shimmers = new Array(2).fill();
  return (
    <div className="side-cart-loading">
      <ul className="side-cart-footer">
        {shimmers.map((_, index) => (
          <li className="mini-cart__item" key={index}>
            <a>
              <div className="cart_image mini-cart__item-image elem-loading"></div>
            </a>
            <div className="mini-cart__item-content">
              <div className="mini-cart__item-title">
                <a className="side-cart-title elem-loading"></a>
                <p className="meta elem-loading"></p>
              </div>
              <div className="product-quantity-box elem-loading"></div>
            </div>
            <div className="mini-cart__item-price ">
              <span className="delete-icon elem-loading"></span>
              <span className="money elem-loading"></span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Loader;
