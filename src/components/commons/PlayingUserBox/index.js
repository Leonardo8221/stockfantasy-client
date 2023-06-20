import { useEffect } from "react";
import "./style.scss";

const PlayingUserBox = (props) => {
  const { user, mine, stocks, isPlaying } = props;

  return (
    <div className={`player ${mine ? "mine" : ""}`}>
      <div className="player-info col-3">
        <p className="player-info-name mb-0">{user.name}</p>
        <p className="player-info-email mb-0">{user.email}</p>
      </div>
      <div className="player-stocks col-7">
        {stocks.length > 0 &&
          stocks.map((stock) => (
            <div className="player-stocks-item">
              <p className="mb-0 player-stocks-item-ticker">
                {stock.stock.ticker}
              </p>
              <p className="mb-0 player-stocks-item-number">{stock.length}</p>
              <p className="mb-0 player-stocks-item-price">
                {stock.stock.price}
              </p>
              <p className="mb-0 player-stocks-item-date">{stock.stock.date}</p>
            </div>
          ))}
      </div>
      <div className="player-point col-2">
        <p className="player-point-score mb-0">{user.score}</p>
        <p className="player-point-caption mb-0">
          {isPlaying ? "Current Score" : "Total socre"}
        </p>
      </div>
    </div>
  );
};

export default PlayingUserBox;
