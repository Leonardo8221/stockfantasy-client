import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { formatRoom } from "../../../actions/room";
import { getRoom, exitGame } from "../../../actions/room";
import { createGame } from "../../../actions/game";
import { updateUser } from "../../../actions/user";
import { getGames } from "../../../actions/game";
import { getAllUers } from "../../../actions/user";
import { startGame } from "../../../actions/game";

import StockListItem from "../../commons/StockListItem";
import PlayerBox from "../../commons/PlayerBox";
import SelectedStockItem from "../../commons/SelectedStockItem";
import "./style.css";

const GameSetup = ({
  getRoom,
  formatRoom,
  exitGame,
  createGame,
  updateUser,
  getGames,
  getAllUers,
  startGame,

  rooms,
  user,
  games,
  stocks,
  isRoomCreated,
  isGameStarted,
  isJoined,
  users,
}) => {
  const [selectedStocks, setSelectedStocks] = useState([]);
  const navigate = useNavigate();
  const { roomID } = useParams();

  // if user is joined then isRoomCreated set to false
  useEffect(() => {
    if (isRoomCreated) {
      formatRoom();
    }
  }, [formatRoom, isRoomCreated]);

  //Load room, and games by room ID
  useEffect(() => {
    getRoom(roomID);
    getGames(roomID);
  }, [getGames, getRoom, roomID]);

  //if games are loaded successfully then set the state of seletedstocks
  useEffect(() => {
    if (games.length > 0 && games.find((game) => game.playerID === user._id)) {
      setSelectedStocks(
        games.find((game) => game.playerID === user._id).stocks
      );
    }
  }, [games.length]);

  //if player exit game then move to the join game page
  useEffect(() => {
    if (!isJoined) {
      navigate("/join-room");
      localStorage.setItem("isJoined", isJoined);
    }
  }, [isJoined, navigate]);

  //if all players are ready to start game then move to the game room page
  useEffect(() => {
    if (isGameStarted) navigate(`/gameRoom/${roomID}`);
  }, [roomID, isGameStarted, navigate]);

  //Get all the users
  useEffect(() => {
    getAllUers();
  }, [getAllUers]);

  //if all users of the room are ready then start the game.
  useEffect(() => {
    if (
      rooms.length > 0 &&
      games.find((game) => game.roomID === roomID) &&
      rooms[rooms.length - 1].players.length > 0 &&
      rooms[rooms.length - 1].players.map(
        (player) =>
          games.find((game) => game.playerID === player) &&
          games.find((game) => game.playerID === player).isReady
      )
    ) {
      startGame(roomID);
    }
  }, [games, roomID, rooms, startGame]);

  const handleReadyBtn = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    createGame({ roomID, selectedStocks });
    updateUser(user);
  };

  const handleExitBtn = (roomID) => {
    exitGame(user._id, roomID);
  };

  const handleClickStocksListItem = (stockID) => {
    if (
      user.budget < stocks.find((stock) => stock.id === stockID).price ||
      (games.length > 0 && games.find((game) => game.playerID === user._id))
    ) {
      alert("You can't buy the stock anymore");
      return;
    }
    const index = selectedStocks.find((s) => s.stock.id === stockID);
    if (index) {
      const updatedSelectedStocks = [...selectedStocks];
      index.length += 1;
      setSelectedStocks(updatedSelectedStocks);
    } else {
      setSelectedStocks([
        ...selectedStocks,
        {
          id: uuidv4(),
          length: 1,
          stock: stocks.find((stock) => stock.id === stockID),
        },
      ]);
    }

    user.budget = (
      user.budget - stocks.find((stock) => stock.id === stockID).price
    ).toFixed(2);
  };

  const handleClickSelectedStock = (stockID) => {
    const index = selectedStocks.find((s) => s.id === stockID);
    if (index) {
      const updatedSelectedStocks = [...selectedStocks];
      index.length -= 1;
      if (index.length === 0) {
        const newArr = updatedSelectedStocks.filter(
          (item) => item.id !== index.id
        );
        setSelectedStocks(newArr);
      } else setSelectedStocks(updatedSelectedStocks);
    }

    user.budget = (Number(user.budget) + Number(index.stock.price)).toFixed(2);
  };

  return (
    <section className="container p-2">
      <div className="d-flex align-items justify-content-between">
        <h1 className="large text-primary mb-4">
          Game Setup -{" "}
          <span className="text-success mb-0 text-uppercase">
            {rooms.length > 0 && rooms[rooms.length - 1].name}
          </span>
        </h1>
        <div>
          <button
            className="btn btn-danger"
            onClick={() => handleExitBtn(roomID)}
          >
            Exit
          </button>
        </div>
      </div>

      <div className="game-players mb-4">
        {rooms.length > 0 &&
          rooms[rooms.length - 1].players
            .filter((item) => item !== user._id)
            .map((item) => (
              <PlayerBox
                key={item}
                name={
                  users.length > 0 &&
                  users.find((user) => user._id === item).name
                }
                email={
                  users.length > 0 &&
                  users.find((user) => user._id === item).email
                }
                isReady={
                  games.length > 0 &&
                  games.find((game) => game.playerID === item)
                    ? true
                    : false
                }
              />
            ))}
      </div>

      <div className="game-setup-container">
        <div className="left p-4">
          <h4>Stock List</h4>
          <div className="stock-list">
            {stocks.map((stock) => (
              <StockListItem
                key={stock.id}
                {...stock}
                onClick={() => handleClickStocksListItem(stock.id)}
              />
            ))}
          </div>
        </div>
        <div className="right p-4">
          <div className="d-flex flex-row justify-content-between align-items-center mb-3">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <p className="large text-primary mb-0">
                Budget:{" "}
                <span className="large text-success">${user.budget}</span>
              </p>
            </div>
            <button
              className="btn btn-success"
              onClick={(e) => handleReadyBtn(e)}
              disabled={
                games.length > 0 &&
                games.find((game) => game.playerID === user._id)
                  ? true
                  : false
              }
            >
              Ready
            </button>
          </div>
          <div className="selected-stocks">
            {selectedStocks.length > 0 ? (
              selectedStocks.map((stock) => (
                <SelectedStockItem
                  key={stock.id}
                  onClick={() => handleClickSelectedStock(stock.id)}
                  ticker={stock.stock.ticker}
                  length={stock.length}
                  disabled={
                    games.length > 0 &&
                    games.find((game) => game.playerID === user._id)
                      ? true
                      : false
                  }
                />
              ))
            ) : (
              <h3 className="mt-5 text-dark text-center no-stocks">
                Select the stocks
              </h3>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

GameSetup.propTypes = {
  getRoom: PropTypes.func.isRequired,
  formatRoom: PropTypes.func.isRequired,
  exitGame: PropTypes.func,
  createGame: PropTypes.func,
  updateUser: PropTypes.func,
  getGames: PropTypes.func,
  getAllUers: PropTypes.func,
  startGame: PropTypes.func,
  rooms: PropTypes.object,
  games: PropTypes.arrayOf(PropTypes.object),
  stocks: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object.isRequired,
  isRoomCreated: PropTypes.bool,
  isGameStarted: PropTypes.bool,
  isJoined: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  rooms: state.roomReducer.rooms,
  isJoined: state.roomReducer.isJoined,
  isRoomCreated: state.roomReducer.isRoomCreated,
  games: state.gameReducer.games,
  stocks: state.gameReducer.stocks,
  isGameStarted: state.roomReducer.isGameStarted,
  user: state.auth.user,
  users: state.userReducer.users,
});

export default connect(mapStateToProps, {
  getRoom,
  formatRoom,
  exitGame,
  createGame,
  updateUser,
  getGames,
  getAllUers,
  startGame,
})(GameSetup);
