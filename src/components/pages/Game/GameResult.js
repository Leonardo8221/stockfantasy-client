import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getRoom } from "../../../actions/room";
import { getGamesByRoomID } from "../../../actions/game";
import { getAllUers } from "../../../actions/user";
import { getScores } from "../../../actions/score";

import PlayingUserBox from "../../commons/PlayingUserBox";

const GameResult = () => {
  const { room } = useSelector((state) => state.roomReducer);
  const { users } = useSelector((state) => state.userReducer);
  const { games } = useSelector((state) => state.gameReducer);
  const { user } = useSelector((state) => state.auth);
  const { scores } = useSelector((state) => state.scoreReducer);

  const { roomID } = useParams();
  const dispatch = useDispatch();

  //Get room, games, users from server
  useEffect(() => {
    dispatch(getRoom(roomID));
    dispatch(getGamesByRoomID(roomID));
    dispatch(getScores(roomID));
    dispatch(getAllUers());
  }, [dispatch, roomID]);

  return (
    <section className="container">
      <div className="d-flex flex-row align-items-center justify-content-between mb-4">
        <h1 className="large text-primary mb-4">
          Game Room{" "}
          <span style={{ textTransform: "uppercase" }}>
            ({room && room.name})
          </span>
          <span className="lead text-danger">Finished</span>
        </h1>
        <Link className="btn btn-danger" to="/home">
          Back
        </Link>
      </div>

      <div className="players-in-progress">
        {room &&
          room.players?.map((player) => (
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

export default GameResult;
