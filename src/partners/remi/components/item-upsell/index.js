const ItemUpSell = ({ handleChange }) => {
  return (
    <button
      type="button"
      name="checkout"
      className="global-button global-button--primary side-cart-upsell"
      onClick={handleChange}
    >
      Upgrade to Remi Club & Save 20%
    </button>
  );
};

export default ItemUpSell;
