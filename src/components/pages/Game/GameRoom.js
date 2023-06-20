import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import TimeCounter from "../../commons/TimeCounter";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRoom } from "../../../actions/room";
import { getGames } from "../../../actions/game";
import { getAllUers } from "../../../actions/user";
import PlayingUserBox from "../../commons/PlayingUserBox";

const GameRoom = ({ rooms, users, games, getRoom, getGames, getAllUers }) => {
  const [isGameFinished, setIsGameFinished] = useState(true);

  const { roomID } = useParams();

  useEffect(() => {
    getRoom(roomID);
    getGames(roomID);
    getAllUers();
  }, [getAllUers, getGames, getRoom, roomID]);

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
        {rooms.length > 0 &&
          rooms[rooms.length - 1].players.map((player) => (
            <PlayingUserBox
              key={player}
              user={
                users.length > 0 && users.find((user) => user._id === player)
              }
            
              isPlaying={true}
            />
          ))}
      </div>
    </section>
  );
};

GameRoom.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  getRoom: PropTypes.func.isRequired,
  getGames: PropTypes.func,
  getAllUers: PropTypes.func,
  games: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  rooms: state.roomReducer.rooms,
  users: state.userReducer.users,
  games: state.gameReducer.games,
});
export default connect(mapStateToProps, { getRoom, getGames, getAllUers })(
  GameRoom
);
