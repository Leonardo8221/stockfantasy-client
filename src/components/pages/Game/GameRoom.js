import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import TimeCounter from "../../commons/TimeCounter";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRoom } from "../../../actions/room";

const GameRoom = ({ rooms, getRoom }) => {
  const [isGameFinished, setIsGameFinished] = useState(true);

  const { roomID } = useParams();

  useEffect(() => {
    getRoom(roomID);
  }, [roomID]);

  return (
    <section className="container">
      <div className="d-flex flex-row align-items-center justify-content-between mb-4">
        <h1 className="large text-primary mb-4">
          Game Room{" "}
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
      {rooms.length > 0 && (
        <div className="text-success" style={{ fontSize: "24px" }}>
          <TimeCounter
          startedDate={rooms[rooms.length - 1].startedDate}
          duration={rooms[rooms.length - 1].duration}
        />
        </div>
        
      )}

      <div className="players-in-progress d-flex flex-column gap-3 py-2">
        <div className="player">
          <div className="player-info col-3">
            <p className="mb-0">Player 1</p>
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
            <p className="mb-0">Player 3</p>
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
            <p className="mb-0">Player 4</p>
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
            <p>Player 2</p>
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

GameRoom.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  getRoom: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  rooms: state.roomReducer.rooms,
});
export default connect(mapStateToProps, { getRoom })(GameRoom);
