import { useUpsell } from '../../../../../store';

const UpSell = ({ item, line }) => {
  const [isUpsell, { onCartUpdate }] = useUpsell(item);

  if (!isUpsell) return null;
  const onClick = () => {
    onCartUpdate({ item, line });
  };
  return (
    <button
      type="button"
      name="checkout"
      className="global-button global-button--primary"
      onClick={onClick}
    >
      Join the Remi Club <span>& Save 20%</span>
    </button>
  );
};

export default UpSell;
