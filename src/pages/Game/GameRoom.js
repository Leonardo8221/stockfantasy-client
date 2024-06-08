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

import axios from "axios";

const GameRoom = () => {
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
    dispatch({ type: GAME_START_INIT });
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

  const getCurrentStockPrice = (stock) => {
    let price = 0;
    axios
      .get(
        `https://financialmodelingprep.com/api/v3/quote-short/${stock}?apikey=16eec80c5f5ee710a5a15f0e381f88a6`
      )
      .then((res) => (price = res.data.price))
      .catch((err) => console.log(err));

      return price;
  };
  //calculate the score
  const calculateScore = (stocks) => {
    let score = 0;
    console.log("____________1", stocks);
    let tempStock = {
      length: 0,
      stock: ""
    };
    stocks.forEach((stock) => {

    });
    return score;
  };

  //when the game ends, give the score to the players
  const handleGameEnd = (endTime) => {
    room.players.forEach((playerID) => {
      const score = calculateScore(
        games.find((game) => game.playerID === playerID).stocks
      );
      // dispatch(giveScoreToUser(playerID, score, roomID));
    });
    // dispatch(endGame(roomID, endTime));
  };

  useEffect(() => {
    if (isGameFinished) navigate(`/game-result/${roomID}/`);
  }, [isGameFinished, navigate, roomID]);

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
            onGameEnd={handleGameEnd}
          />
        </div>
      )}

      <div className="players-in-progress">
        {players?.map((player, idx) => (
          <PlayingUserBox
            key={idx}
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
