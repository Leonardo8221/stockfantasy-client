import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import TimeCounter from "../../commons/TimeCounter";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRoom } from "../../../actions/room";
import { getGames } from "../../../actions/game";
import { getAllUers } from "../../../actions/user";
import PlayingUserBox from "../../commons/PlayingUserBox";

const GameRoom = ({
  rooms,
  users,
  games,
  user,
  getRoom,
  getGames,
  getAllUers,
}) => {
  const [isGameFinished, setIsGameFinished] = useState(true);

  const { roomID } = useParams();

  useEffect(() => {
    getRoom(roomID);
    getGames(roomID);
  }, [getGames, getRoom, roomID]);
  //Get all the users
  useEffect(() => {
    getAllUers();
  }, [getAllUers]);


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

      <div className="players-in-progress">
        {rooms.length > 0 &&
          rooms[rooms.length - 1].players.map((player) => (
            <PlayingUserBox
              key={player}
              user={
                users.length > 0 && users.find((user) => user._id === player)
              }
              stocks={
                games.length > 0 &&
                games.find(
                  (game) => game.roomID === roomID && game.playerID === player
                ).stocks
              }
              mine={user._id === player ? true : false}
              isPlaying={true}
            />
          ))}
      </div>
    </section>
  );
};

GameRoom.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object),
  getRoom: PropTypes.func,
  getGames: PropTypes.func,
  getAllUers: PropTypes.func,
  games: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  rooms: state.roomReducer.rooms,
  users: state.userReducer.users,
  games: state.gameReducer.games,
  user: state.auth.user,
});
export default connect(mapStateToProps, { getRoom, getGames, getAllUers })(
  GameRoom
);
