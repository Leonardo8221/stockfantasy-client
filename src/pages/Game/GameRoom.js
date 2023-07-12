import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TimeCounter from "../../components/commons/TimeCounter";
import PlayingUserBox from "../../components/commons/PlayingUserBox";

import { getRoom, endGame } from "../../redux/actions/room";
import { getGamesByRoomID } from "../../redux/actions/game";
import { getAllUers } from "../../redux/actions/user";
import { getScores, giveScoreToUser } from "../../redux/actions/score";
import { GAME_START_INIT } from "../../redux/constants/gameConstant";

const GameRoom = () => {
  const [endTime, setEndtime] = useState();
  const [players, setPlayers] = useState([]);
  const { room, isGameFinished } = useSelector((state) => state.roomReducer);
  const { users } = useSelector((state) => state.userReducer);
  const { games } = useSelector((state) => state.gameReducer);
  const { user } = useSelector((state) => state.auth);
  const { scores } = useSelector((state) => state.scoreReducer);

  const { roomID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //Get room, games, users from server
  useEffect(() => {
    dispatch(getRoom(roomID));
    dispatch(getGamesByRoomID(roomID));
    dispatch(getAllUers());
    dispatch(getScores(roomID));
    dispatch({ type: GAME_START_INIT })
  }, [dispatch, roomID]);

  //Sorting users
  useEffect(() => {
    if (scores.length > 0) {
      let temp = [];
      scores
        .sort((a, b) => b.point - a.point)
        .map((score) =>
          temp.push({
            name: users.find((user) => user._id === score.playerID)?.name,
            email: users.find((user) => user._id === score.playerID)?.email,
            stocks: games.find((game) => game.playerID === score.playerID)
              ?.stocks,
            score: score.point,
          })
        );
      setPlayers(temp);
    }
  }, [games, scores, users]);

  useEffect(() => {
    if (isGameFinished) navigate(`/game-result/${roomID}/`);
  }, [isGameFinished]);

  return (
    <section className="container">
      <div className="d-flex flex-row align-items-center justify-content-between mb-4">
        <h1 className="large text-primary mb-4">
          Game Room{" "}
          <span style={{ textTransform: "uppercase" }}>
            ({room && room.name})
          </span>
          <span className="lead text-dark">Playing...</span>
        </h1>
        <Link className="btn btn-danger" to="/home">
          Back
        </Link>
      </div>
      {room && (
        <div className="text-success" style={{ fontSize: "24px" }}>
          <TimeCounter
            startedDate={room.startedDate}
            duration={room.duration}
          />
        </div>
      )}

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

export default GameRoom;
