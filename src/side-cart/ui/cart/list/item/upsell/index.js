import { UPSELL } from '@partners/text';
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
      {UPSELL}
    </button>
  );
};

export default UpSell;
