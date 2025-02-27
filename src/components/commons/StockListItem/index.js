import "./style.scss"

const StockListItem = (props) => {

    const {symbol, price, volume, onClick} = props;
    return (
        <div className="stock-list-item" onClick={onClick}>
            <h5 className="stock-list-item-name">{symbol}</h5>
            <div className="text-muted stock-list-item-info">
                <p className="stock-list-item-info-price">Price: {price}</p>
                <p className="stock-list-item-info-date">Volume: {volume}</p>
            </div>
        </div>
    )
}
export default StockListItem;