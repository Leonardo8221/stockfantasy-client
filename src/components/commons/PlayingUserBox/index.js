import { useEffect } from "react";
import "./style.scss";

const PlayingUserBox = (props) => {
  const { user, isPlaying } = props;
  useEffect(() => {
    console.log("####", user, isPlaying);
  }, []);

  return (
    <div className="player">
      <div className="player-info col-3">
        <p className="mb-0">{user.name}</p>
      </div>
      {/* <div className="player-stocks col-7">
        {stocks.map((stock) => (
          <div className="player-stocks-item">
            <p className="mb-0 player-stocks-item-ticker">{stock.ticker}</p>
            <p className="mb-0 player-stocks-item-price">{stock.price}</p>
            <p className="mb-0 player-stocks-item-date">{stock.date}</p>
          </div>
        ))}
      </div> */}
      <div className="player-point col-2">
        <p className="score">{user.score}</p>
        <p className="score-caption">
          {isPlaying ? "Current Point" : "Total socre"}
        </p>
      </div>
    </div>
  );
};

export default PlayingUserBox;
