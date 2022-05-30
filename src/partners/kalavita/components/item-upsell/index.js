import './style.css';
const ItemUpSell = ({ handleChange, isUpsell }) => {
  return (
    <div name="checkout" className="side-cart-upsell">
      <label className="switch">
        <input
          type="checkbox"
          defaultChecked={!isUpsell}
          onChange={handleChange}
        />
        <span className="slider round"></span>
      </label>
      <span>
        Subscribe now and save $4.5 + free US shipping.
        <br />
        Cancel Anytime.
      </span>
    </div>
  );
};

export default ItemUpSell;
