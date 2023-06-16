import { useState } from 'react';
import { Link } from 'react-router-dom';

const GameResult = () => {
  const [isGameFinished, setIsGameFinished] = useState(false);

  return (
    <section className="container">
      <div className="d-flex flex-row align-items-center justify-content-between mb-4">
        <h1 className="large text-primary mb-4">
          Game Room {' '}
          {isGameFinished ? (
            <span className="lead text-dark">Playing...</span>
          ) : (
            <span className="lead text-danger">Finished</span>
          )}
        </h1>
        <Link className="btn btn-danger" to="/home">
          Back
        </Link>
      </div>

      <div className="players-in-progress d-flex flex-column gap-3 py-2">
        <div className="player">
          <div className="player-info col-3">
            <p className="mb-0">Player 3</p>
          </div>
          <div className="player-stocks col-7">
            <div className="player-stocks-item">player-stocks-item2</div>
            <div className="player-stocks-item">player-stocks-item4</div>
            <div className="player-stocks-item">player-stocks-item6</div>
            <div className="player-stocks-item">player-stocks-item11</div>
          </div>
          <div className="player-point col-2">
            <p className="score">15</p>
            <p className="score-caption">Current Point</p>
          </div>
        </div>
        <div className="player mine">
          <div className="player-info col-3">
            <p className="mb-0">Player 4</p>
          </div>
          <div className="player-stocks col-7">
            <div className="player-stocks-item">player-stocks-item2</div>
            <div className="player-stocks-item">player-stocks-item4</div>
            <div className="player-stocks-item">player-stocks-item6</div>
            <div className="player-stocks-item">player-stocks-item11</div>
          </div>
          <div className="player-point col-2">
            <p className="score">12</p>
            <p className="score-caption">Current Point</p>
          </div>
        </div>
        <div className="player">
          <div className="player-info col-3">
            <p className="mb-0">Player 2</p>
          </div>
          <div className="player-stocks col-7">
            <div className="player-stocks-item">player-stocks-item2</div>
            <div className="player-stocks-item">player-stocks-item4</div>
            <div className="player-stocks-item">player-stocks-item6</div>
            <div className="player-stocks-item">player-stocks-item11</div>
          </div>
          <div className="player-point col-2">
            <p className="score">8</p>
            <p className="score-caption">Current Point</p>
          </div>
        </div>
        <div className="player">
          <div className="player-info col-3">
            <p>Player 1</p>
          </div>
          <div className="player-stocks col-7">
            <div className="player-stocks-item">player-stocks-item2</div>
            <div className="player-stocks-item">player-stocks-item4</div>
            <div className="player-stocks-item">player-stocks-item6</div>
            <div className="player-stocks-item">player-stocks-item11</div>
          </div>
          <div className="player-point col-2">
            <p className="score">6</p>
            <p className="score-caption">Current Point</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameResult;
