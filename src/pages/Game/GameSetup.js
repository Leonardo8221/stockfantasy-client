/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useDispatch, useSelector } from "react-redux";

import { formatRoom, exitGame, getRoom } from "../../redux/actions/room";
import {
  createGame,
  startGame,
  getGamesByRoomID,
  getAllStocks,
} from "../../redux/actions/game";
import { getAllUers } from "../../redux/actions/user";
import { giveScoreToUser } from "../../redux/actions/score";

import StockListItem from "../../components/commons/StockListItem";
import PlayerBox from "../../components/commons/PlayerBox";
import SelectedStockItem from "../../components/commons/SelectedStockItem";
import Loading from "../../components/commons/Loading";

import "./style.css";
const GameSetup = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { room, isRoomCreated, isGameStarted, isJoined } = useSelector(
    (state) => state.roomReducer
  );
  const { games, stocks } = useSelector((state) => state.gameReducer);
  const { users } = useSelector((state) => state.userReducer);
  const socket = useSelector((state) => state.socket);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const navigate = useNavigate();
  const { roomID } = useParams();
  const [budget, setBudget] = useState(1000);

  useEffect(() => {
    // if user is joined then isRoomCreated set to false
    if (isRoomCreated) {
      dispatch(formatRoom());
    }
  }, [dispatch, isRoomCreated]);

  //Load room, games, users
  useEffect(() => {
    dispatch(getRoom(roomID));
    dispatch(getAllUers());
    dispatch(getGamesByRoomID(roomID));
    dispatch(getAllStocks());
  }, [dispatch, roomID]);

  //when clike the exit buttom
  useEffect(() => {
    if (!isJoined && !isGameStarted) navigate("/join-room");
    if (isGameStarted) {
      navigate(`/gameRoom/${roomID}`);
    }
  }, [isJoined, isGameStarted]);

  //if games are loaded successfully then set the state of seletedstocks
  useEffect(() => {
    const playerGame = games.find(
      (game) => game.roomID === roomID && game.playerID === user._id
    );
    if (games.length > 0 && playerGame && stocks.length) {
      setSelectedStocks(playerGame.stocks);
    }
  }, [games.length]);

  //if all users of the room are ready then start the game.
  useEffect(() => {
    if (room && games?.length > 0) {
      const players = room.players;
      if (
        games.filter((game) => game.roomID === roomID)?.length ===
          players?.length &&
        players?.length === 4
      ) {
        dispatch(startGame(roomID));
        players.forEach((player) => {
          const formData = {
            playerID: player,
            roomID: roomID,
            point: 0,
          };
          dispatch(giveScoreToUser(formData));
        });
      }
    }
  }, [games.length]);

  const handleReadyBtn = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    dispatch(
      createGame({ roomID, selectedStocks, playerID: user._id }, socket)
    );
  };

  const handleExitBtn = (roomID) => {
    if (window.confirm("Do you want to exit the game?")) {
      dispatch(exitGame({ userID: user._id, roomID }, socket));
      return;
    }
  };

  const handleClickStocksListItem = (stockSymbol) => {
    if (
      budget < stocks?.find((stock) => stock.symbol === stockSymbol).price ||
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
          stock: stocks?.find((stock) => stock.symbol === stockSymbol),
        },
      ]);
    }

    setBudget(
      (
        budget - stocks?.find((stock) => stock.symbol === stockSymbol).price
      ).toFixed(2)
    );
  };

  const handleClickSelectedStock = (stockSymbol) => {
    const index = selectedStocks.find((s) => s.stock.symbol === stockSymbol);
    if (index) {
      const updatedSelectedStocks = [...selectedStocks];
      index.length -= 1;
      if (index.length === 0) {
        const newArr = updatedSelectedStocks.filter(
          (item) => item.stock.symbol !== index.stock.symbol
        );
        setSelectedStocks(newArr);
      } else setSelectedStocks(updatedSelectedStocks);
    }

    setBudget((Number(budget) + Number(index.stock.price)).toFixed(2));
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
            Exit <i className="fa fa-sign-out-alt"></i>
          </button>
        </div>
      </div>

      <div className="game-players mb-4">
        {room &&
          room.players
            ?.filter((item) => item !== user._id)
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
          <h4>Stock List ({stocks && stocks.length})</h4>
          <div className="stock-list">
            {stocks.length > 0 ? (
              stocks?.map((stock, key) => (
                <StockListItem
                  key={key}
                  {...stock}
                  onClick={() => handleClickStocksListItem(stock.symbol)}
                />
              ))
            ) : (
              <Loading />
            )}
          </div>
        </div>
        <div className="right p-4">
          <div className="d-flex flex-row justify-content-between align-items-center mb-3">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <p className="large text-primary mb-0">
                Budget: <span className="large text-success">${budget}</span>
                {process.env.PORT}
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
                  onClick={() => handleClickSelectedStock(stock.stock.symbol)}
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
