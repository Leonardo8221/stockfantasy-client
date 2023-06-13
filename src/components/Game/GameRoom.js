import { useState } from 'react';

const GameRoom = () => {
  const { isGameFinished, setIsGameFinished } = useState(true);
  return (
    <section className="container">
      <div className="d-flex flex-row align-items-center justify-content-between mb-4">
        <h1 className="text-primary">
          Game Room{' '}
          <small
            className={
              isGameFinished ? 'text-success lead' : 'text-danger lead'
            }
          >
            {isGameFinished ? 'Playing...' : 'Finished'}
          </small>
        </h1>
        <h5 className="text-success">Time remaining: 2days, 03:45:23</h5>
      </div>

      <div className="players-in-progress d-flex flex-column gap-3 py-2">
        <div className="player">
          <div className="player-info col-2">
            <h5>Player 1</h5>
          </div>

          <div className="player-stocks col-9">
            <div className="player-stocks-item">player-stocks-item2</div>
            <div className="player-stocks-item">player-stocks-item4</div>
            <div className="player-stocks-item">player-stocks-item6</div>
            <div className="player-stocks-item">player-stocks-item11</div>
          </div>
          <div className="player-point col-1">4</div>
        </div>
      </div>
    </section>
  );
};

export default GameRoom;
