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
      Upgrade to Remi Club & Save 20%
    </button>
  );
};

export default UpSell;
