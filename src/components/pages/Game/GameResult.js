import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRoom } from "../../../actions/room";
import { getGames } from "../../../actions/game";
import { getAllUers } from "../../../actions/user";
import { getScores } from "../../../actions/score";

import PlayingUserBox from "../../commons/PlayingUserBox";

const GameResult = ({
  rooms,
  users,
  user,
  scores,
  games,
  getRoom,
  getGames,
  getAllUers,
}) => {
  const { roomID } = useParams();

  //Get room and games from server
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
          <span style={{ textTransform: "uppercase" }}>
            ({rooms.length > 0 && rooms[rooms.length - 1].name})
          </span>
          <span className="lead text-danger">Finished</span>
        </h1>
        <Link className="btn btn-danger" to="/home">
          Back
        </Link>
      </div>

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
              score={
                scores.length > 0
                  ? scores.filter((score) => score.playerID === player)
                  : 0
              }
              isPlaying={true}
            />
          ))}
      </div>
    </section>
  );
};

GameResult.propTypes = {
  getRoom: PropTypes.func,
  getGames: PropTypes.func,
  getAllUers: PropTypes.func,
  getScores: PropTypes.func,
  rooms: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object),
  scores: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  rooms: state.roomReducer.rooms,
  users: state.userReducer.users,
  scores: state.scoreReducer.scores,
  games: state.gameReducer.games,
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  getRoom,
  getGames,
  getAllUers,
  getScores,
})(GameResult);
