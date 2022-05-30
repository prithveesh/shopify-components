import './style.css';

const ProgressBar = ({ cart }) => {
  const { total_price } = cart;
  let progressText = 'Congrats! You get free standard US shipping.';
  if (total_price < 5000) {
    progressText = `$${parseFloat((5000 - total_price) / 100).toFixed(
      2,
    )} away from saving $6.99 on US shipping`;
  }
  return (
    <div className="progress-bar-container">
      <p>{progressText}</p>
    </div>
  );
};

export default ProgressBar;
