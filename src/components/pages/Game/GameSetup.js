import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useDispatch, useSelector } from "react-redux";

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

const GameSetup = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { room, isRoomCreated, isGameStarted, isJoined } = useSelector(
    (state) => state.roomReducer
  );
  const { games, stocks } = useSelector((state) => state.gameReducer);
  const { users } = useSelector((state) => state.userReducer);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const navigate = useNavigate();
  const { roomID } = useParams();

  // const [stocks, setStocks] = useState([]);

  // if user is joined then isRoomCreated set to false
  useEffect(() => {
    if (isRoomCreated) {
      dispatch(formatRoom());
    }
  }, []);

  //Load room, and games by room ID
  useEffect(() => {
    dispatch(getRoom(roomID));
  }, []);

  useEffect(() => {
    dispatch(getAllUers());
  }, []);
  useEffect(() => {
    dispatch(getGames(roomID));
  }, []);

  //when clike the exit buttom
  useEffect(() => {
    if (isJoined === false) navigate("/join-room");
  }, [isJoined, navigate]);

  //if games are loaded successfully then set the state of seletedstocks
  useEffect(() => {
    if (
      games.length > 0 &&
      games.find((game) => game.roomID === roomID && game.playerID === user._id)
    ) {
      setSelectedStocks(
        games.find((game) => game.playerID === user._id).stocks
      );
    }
  }, [games]);

  //if all players are ready to start game then move to the game room page
  useEffect(() => {
    if (isGameStarted === true) navigate(`/gameRoom/${roomID}`);
  }, [isGameStarted]);

  //if all users of the room are ready then start the game.
  useEffect(() => {
    if (room && games.length > 0) {
      const thisGame = games.filter((game) => game.roomID === roomID);
      const players = room.players;

      if (thisGame.length === players.length && players.length === 2) {
        dispatch(startGame(roomID));
      }
    }
  }, [isGameStarted]);

  const handleReadyBtn = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    dispatch(createGame({ roomID, selectedStocks }));
    dispatch(updateUser(user));
  };

  const handleExitBtn = (roomID) => {
    dispatch(exitGame(user._id, roomID));
  };

  const handleClickStocksListItem = (stockSymbol) => {
    if (
      user.budget < stocks.find((stock) => stock.symbol === stockSymbol).price ||
      (games.length > 0 && games.find((game) => game.playerID === user._id))
    ) {
      alert("You can't buy the stock anymore");
      return;
    }
    const index = selectedStocks.find((s) => s.stock.symbol === stockSymbol);
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
          stock: stocks.find((stock) => stock.symbol === stockSymbol),
        },
      ]);
    }

    user.budget = (
      user.budget - stocks.find((stock) => stock.symbol === stockSymbol).price
    ).toFixed(2);
  };

  const handleClickSelectedStock = (stockSymbol) => {
    const index = selectedStocks.find((s) => s.symbol === stockSymbol);
    if (index) {
      const updatedSelectedStocks = [...selectedStocks];
      index.length -= 1;
      if (index.length === 0) {
        const newArr = updatedSelectedStocks.filter(
          (item) => item.symbol !== index.symbol
        );
        setSelectedStocks(newArr);
      } else setSelectedStocks(updatedSelectedStocks);
    }

    user.budget = (Number(user.budget) + Number(index.stock.price)).toFixed(2);
  };

  return (
    <section className="container">
      <div className="d-flex align-items justify-content-between">
        <h1 className="large text-primary mb-4">
          Game Setup -{" "}
          <span className="text-success mb-0 text-uppercase">
            {room && room.name}
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
        {room &&
          room.players
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
            {stocks.map((stock, key) => (
              <StockListItem
                key={key}
                {...stock}
                onClick={() => handleClickStocksListItem(stock.symbol)}
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
              selectedStocks.map((stock, key) => (
                <SelectedStockItem
                  key={key}
                  onClick={() => handleClickSelectedStock(stock.symbol)}
                  symbol={stock.stock.symbol}
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

export default GameSetup;
