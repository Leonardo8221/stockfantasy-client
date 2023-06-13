import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GameRoom = () => {
  const [ isGameFinished, setIsGameFinished ] = useState(true);

  return (
    <section className="container">
      <div className="d-flex flex-row align-items-center justify-content-between mb-4">
        <h1 className="text-primary">
          Game Room{' '}
          {isGameFinished ? (
            <span className="lead text-dark">Playing...</span>
          ) : (
            <span className="lead text-danger">Finished</span>
          )}
        </h1>
        <Link className='btn btn-danger' to="/home">Back</Link>
      </div>

        <h5 className="text-success">Time remaining: 2days, 03:45:23</h5>
      <div className="players-in-progress d-flex flex-column gap-3 py-2">
        <div className="player">
          <div className="player-info col-3">
            <p className='mb-0'>Player 1</p>
          </div>
          <div className="player-stocks col-7">
            <div className="player-stocks-item">player-stocks-item2</div>
            <div className="player-stocks-item">player-stocks-item4</div>
            <div className="player-stocks-item">player-stocks-item6</div>
            <div className="player-stocks-item">player-stocks-item11</div>
          </div>
          <div className="player-point col-2">
            <p className="score">4</p>
            <p className="score-caption">Current Point</p>
          </div>
        </div>
        <div className="player mine">
          <div className="player-info col-3">
            <p className='mb-0'>Player 3</p>
          </div>
          <div className="player-stocks col-7">
            <div className="player-stocks-item">player-stocks-item2</div>
            <div className="player-stocks-item">player-stocks-item4</div>
            <div className="player-stocks-item">player-stocks-item6</div>
            <div className="player-stocks-item">player-stocks-item11</div>
          </div>
          <div className="player-point col-2">
            <p className="score">3</p>
            <p className="score-caption">Current Point</p>
          </div>
        </div>
        <div className="player">
          <div className="player-info col-3">
            <p className='mb-0'>Player 4</p>
          </div>
          <div className="player-stocks col-7">
            <div className="player-stocks-item">player-stocks-item2</div>
            <div className="player-stocks-item">player-stocks-item4</div>
            <div className="player-stocks-item">player-stocks-item6</div>
            <div className="player-stocks-item">player-stocks-item11</div>
          </div>
          <div className="player-point col-2">
            <p className="score">2</p>
            <p className="score-caption">Current Point</p>
          </div>
        </div>
        <div className="player">
          <div className="player-info col-3">
            <h5>Player 2</h5>
          </div>
          <div className="player-stocks col-7">
            <div className="player-stocks-item">player-stocks-item2</div>
            <div className="player-stocks-item">player-stocks-item4</div>
            <div className="player-stocks-item">player-stocks-item6</div>
            <div className="player-stocks-item">player-stocks-item11</div>
          </div>
          <div className="player-point col-2">
            <p className="score">1</p>
            <p className="score-caption">Current Point</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameRoom;
