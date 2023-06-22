import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import TimeCounter from "../../commons/TimeCounter";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRoom, endGame } from "../../../actions/room";
import { getGames } from "../../../actions/game";
import { getAllUers } from "../../../actions/user";
import { giveScoreToUser } from "../../../actions/score";
import PlayingUserBox from "../../commons/PlayingUserBox";

const GameRoom = ({
  room,
  users,
  games,
  user,
  scores,
  getRoom,
  getGames,
  getAllUers,
  giveScoreToUser,
  endGame,
}) => {
  const [isGameFinished, setIsGameFinished] = useState(true);
  const [evaluations, setEvaluations] = useState([]);
  const [endTime, setEndtime] = useState();

  const { roomID } = useParams();
  const navigate = useNavigate();

  //Get room and games from server
  useEffect(() => {
    getRoom(roomID);
    getGames(roomID);
  }, [getGames, getRoom, roomID]);

  //Get all the users
  useEffect(() => {
    getAllUers();
  }, [getAllUers]);

  useEffect(() => {
    if (isGameFinished) navigate(`/game-result/${roomID}/`);
  }, [isGameFinished, navigate, roomID]);

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
      let start = new Date(room.startedDate);

      setEndtime(new Date(start.getTime() + room.duration * millisecondsInDay));

      const interval = setInterval(() => {
        if (room.players.length > 0) {
          const newEvaluations = room.players.map((player) => {
            let currentPlayerStocks =
              games.length > 0 &&
              games.filter(
                (game) => game.roomID === roomID && game.playerID === player
              );
            const portfolioValue = currentPlayerStocks.reduce(
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
            giveScoreToUser({
              user: evaluation.playerID,
              room: roomID,
              score: evaluations.length - 1,
            });
            return true;
          });
        }
      }, millisecondsInDay); // 24 hours in milliseconds

      return () => clearInterval(interval);
    }
  }, [
    stockPrices,
    evaluationTime,
    room,
    roomID,
    games,
    evaluations,
    giveScoreToUser,
  ]);

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
      setIsGameFinished(true);
      endGame(roomID, endTime);
    }
  }, [endGame, endTime, evaluations, roomID]);

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
        {room &&
          room.players.map((player) => (
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

GameRoom.propTypes = {
  room: PropTypes.arrayOf(PropTypes.object),
  getRoom: PropTypes.func,
  getGames: PropTypes.func,
  getAllUers: PropTypes.func,
  giveScoreToUser: PropTypes.func,
  endGame: PropTypes.func,
  games: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object),
  scores: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  room: state.roomReducer.room,
  users: state.userReducer.users,
  games: state.gameReducer.games,
  scores: state.scoreReducer.scores,
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  getRoom,
  getGames,
  getAllUers,
  giveScoreToUser,
  endGame,
})(GameRoom);
