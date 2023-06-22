import './style.scss'

const SelectedStockItem = (props) => {
  const { symbol, length, onClick, disabled } = props;
  return (
    <div className={`selected-stocks-item ${disabled ? "disabled" : ""}`} onClick={onClick} disabled={true}>
      <p className="selected-stocks-item-ticker mb-0">{symbol} </p>
      <p className="selected-stocks-item-length selected-num mb-0">{length}</p>
    </div>
  );
};

export default SelectedStockItem;
