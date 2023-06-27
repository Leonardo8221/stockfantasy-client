import { useEffect, useState } from "react";
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
  const [players, setPlayers] = useState([]);

  const { roomID } = useParams();
  const dispatch = useDispatch();

  //Get room, games, users from server
  useEffect(() => {
    dispatch(getRoom(roomID));
    dispatch(getGamesByRoomID(roomID));
    dispatch(getScores(roomID));
    dispatch(getAllUers());
  }, [dispatch, roomID]);

  //Sorting users
  useEffect(() => {
    if (scores.length > 0) {
      let temp = [];
      scores
        .sort((a, b) => b.point - a.point)
        .map((score) => (
          temp.push({
            name: users.find((user) => user._id === score.playerID)?.name,
            email: users.find((user) => user._id === score.playerID)?.email,
            stocks: games.find((game) => game.playerID === score.playerID)
              ?.stocks,
            score: score.point,
          })
        ));
      setPlayers(temp);
    }
  }, [games, scores, users]);

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
        {players?.map((player, key) => (
          <PlayingUserBox
            key={key}
            name={player.name}
            email={player.email}
            stocks={player.stocks}
            mine={user.email === player.email ? true : false}
            score={player.score}
            isPlaying={true}
          />
        ))}
      </div>
    </section>
  );
};

export default GameResult;
