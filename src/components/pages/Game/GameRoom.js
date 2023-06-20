import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import TimeCounter from "../../commons/TimeCounter";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRoom } from "../../../actions/room";
import { getGames, giveScoreToUser } from "../../../actions/game";
import { getAllUers } from "../../../actions/user";
import PlayingUserBox from "../../commons/PlayingUserBox";

import PortfolioEvaluator from "../../../utils/portfolioEvaluator";

const GameRoom = ({
  rooms,
  users,
  games,
  user,
  getRoom,
  getGames,
  getAllUers,
  giveScoreToUser
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

  const stockPrices = {
    AAPL: [100, 105, 110, 115, 120],
    GOOG: [500, 510, 520, 530, 540],
    MSFT: [50, 55, 60, 65, 70],
    AMZN: [2000, 2050, 2100, 2150, 2200],
    FB: [150, 155, 160, 165, 170],
    NFLX: [300, 310, 320, 330, 340],
  };

  const evaluationTime = "9:00 AM";

  const [evaluations, setEvaluations] = useState([]);
  const [endTime, setEndtime] = useState();

  useEffect(() => {
    if (rooms.length > 0) {
      let currentRoom = rooms.find((room) => room._id === roomID);
      let millisecondsInDay = 86400000; // 1000 * 60 * 60 * 24;
      let start = Date(currentRoom.startedDate);

      setEndtime(
        new Date(start.getTime() + currentRoom.duration * millisecondsInDay)
      );

      const interval = setInterval(() => {
        if (currentRoom.players.length > 0) {
          const newEvaluations = currentRoom.players.map((player) => {
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

          evaluations.map((evaluation) =>{
            let currentGame = games.length > 0 &&
            games.filter(
              (game) => game.roomID === roomID && game.playerID === evaluation.playerID
            );
            giveScoreToUser({id: currentGame._id, user: evaluation.playerID, score: evaluations.length-1, room: roomID});
            return true;
        });
        }
      }, millisecondsInDay); // 24 hours in milliseconds

      return () => clearInterval(interval);
    }
  }, [stockPrices, evaluationTime, rooms, roomID, games, evaluations, giveScoreToUser]);

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
    }
  }, [endTime, evaluations]);

  return (
    <section className="container">
      <div className="d-flex flex-row align-items-center justify-content-between mb-4">
        <h1 className="large text-primary mb-4">
          Game Room{" "}
          <span style={{ textTransform: "uppercase" }}>
            ({rooms.length > 0 && rooms[rooms.length - 1].name})
          </span>
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
  giveScoreToUser: PropTypes.func,
  games: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  rooms: state.roomReducer.rooms,
  users: state.userReducer.users,
  games: state.gameReducer.games,
  user: state.auth.user,
});
export default connect(mapStateToProps, { getRoom, getGames, getAllUers, giveScoreToUser })(
  GameRoom
);
