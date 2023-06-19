import "./style.scss"

const StockListItem = (props) => {

    const {ticker, price, date, onClick} = props;
    return (
        <div className="stock-list-item" onClick={onClick}>
            <h5 className="stock-list-item-name">{ticker}</h5>
            <div className="text-muted stock-list-item-info">
                <p className="stock-list-item-info-price">Price: {price}</p>
                <p className="stock-list-item-info-date">Date: {date}</p>
            </div>
        </div>
    )
}
export default StockListItem;