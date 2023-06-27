import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import TimeCounter from "../../commons/TimeCounter";

import { useDispatch, useSelector } from "react-redux";
import { getRoom, endGame } from "../../../actions/room";
import { getGamesByRoomID } from "../../../actions/game";
import { getAllUers } from "../../../actions/user";
import { getScores, giveScoreToUser } from "../../../actions/score";
import PlayingUserBox from "../../commons/PlayingUserBox";

const GameRoom = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [endTime, setEndtime] = useState();
  const [players, setPlayers] = useState([]);
  const { room, isGameFinished} = useSelector((state) => state.roomReducer);
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
  }, [dispatch, roomID]);

  //Sorting users
  useEffect(() => {
    if (scores.length > 0) {
      let temp = [];
      scores
        .sort((a, b) => b.point - a.point)
        .map((score) => (
          temp.push({
            name: users.find((user) => user._id === score.playerID).name,
            email: users.find((user) => user._id === score.playerID).email,
            stocks: games.find((game) => game.playerID === score.playerID)
              ?.stocks,
            score: score.point,
          })
        ));
      setPlayers(temp);
    }
  }, [games, scores, users]);

  useEffect(() => {
    if (isGameFinished) navigate(`/game-result/${roomID}/`);
  }, [isGameFinished]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stockPrices = {
    AAPL: [100, 105, 110, 115, 120],
    GOOG: [500, 510, 520, 530, 540],
    MSFT: [50, 55, 60, 65, 70],
    AMZN: [2000, 2050, 2100, 2150, 2200],
    FB: [150, 155, 160, 165, 170],
    NFLX: [300, 310, 320, 330, 340],
  };

  const evaluationTime = "9:00 AM";

  useEffect(() => {
    if (room) {
      let millisecondsInDay = 86400000; // 1000 * 60 * 60 * 24;
      let start = new Date(room?.startedDate);

      setEndtime(new Date(start.getTime() + room.duration * millisecondsInDay));

      console.log(start, endTime);
      const interval = setInterval(() => {
        if (players.length > 0) {
          const newEvaluations = players.map((player) => {
            
            const portfolioValue = player.stocks.reduce(
              (totalValue, stock) => {
                const stockPrice = stockPrices[stock.stock][evaluationTime];
                return totalValue + stockPrice * stock.length;
              },
              0
            );
            return { playerId: player, portfolioValue };
          });

          setEvaluations((prevEvaluations) => [
            ...prevEvaluations,
            newEvaluations,
          ]);
          evaluations.sort((a, b) => b.portfolioValue - a.portfolioValue);

          evaluations.map((evaluation) => {
            dispatch(
              giveScoreToUser({
                user: evaluation.playerID,
                room: roomID,
                point: evaluations.length - 1,
              })
            );
            return true;
          });
        }
      }, millisecondsInDay); // 24 hours in milliseconds

      return () => clearInterval(interval);
    }
  }, [room]);

  //when end the game
  useEffect(() => {
    if (Date.now() >= endTime) {
      const winner = evaluations.reduce(
        (currentWinner, evaluation) => {
          if (evaluation.portfolioValue > currentWinner.portfolioValue) {
            return evaluation;
          }
          return currentWinner;
        },
        { playerId: null, portfolioValue: 0 }
      );
      console.log(
        `The winner is player ${winner.playerId} with a portfolio value of ${winner.portfolioValue}`
      );
      dispatch(endGame(roomID, endTime));
    }
  }, [dispatch, endTime, evaluations, roomID]);

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
