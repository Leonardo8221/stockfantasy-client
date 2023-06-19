import './style.scss'

const SelectedStockItem = (props) => {
  const { ticker, length, onClick } = props;
  return (
    <div className="selected-stocks-item" onClick={onClick}>
      <p className="selected-stocks-item-ticker mb-0">{ticker} </p>
      <p className="selected-stocks-item-length selected-num mb-0">{length}</p>
    </div>
  );
};

export default SelectedStockItem;
