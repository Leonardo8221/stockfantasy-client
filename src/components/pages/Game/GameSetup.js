import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { formatRoom } from "../../../actions/room";
import { getRoom, exitGame } from "../../../actions/room";
import { createGame } from "../../../actions/game";
import { updateUser } from "../../../actions/user";

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
  rooms,
  user,
  stocks,
  isRoomCreated,
  isJoined,
}) => {
  const [selectedStocks, setSelectedStocks] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isRoomCreated) {
      formatRoom();
    }
  }, [formatRoom, isRoomCreated]);

  useEffect(() => {
    getRoom(id);
  }, [getRoom, id]);

  useEffect(() => {
    if (!isJoined) {
      navigate("/join-room");
    }
  }, [isJoined, navigate]);

  const handleReadyBtn = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    // createGame({ user, id, selectedStocks });
    updateUser(user);
    // navigate(`/gameRoom/${id}`);
  };

  const handleExitBtn = (roomID) => {
    exitGame(user._id, roomID);
  };

  const handleClickStocksListItem = (stockID) => {
    if (user.budget < stocks.find((stock) => stock.id === stockID).price) {
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
        console.log(updatedSelectedStocks, index);
        const newArr = updatedSelectedStocks.filter(
          (item) => item.id !== index.id
        );
        setSelectedStocks(newArr);
      } else setSelectedStocks(updatedSelectedStocks);
    }
  };

  return (
    <section className="container p-2">
      <div className="d-flex align-items justify-content-between">
        <h1 className="large text-primary mb-4">
          Game Setup -{" "}
          <span className="text-success mb-0 text-uppercase">
            {rooms.name && rooms.name}
          </span>
        </h1>
        <div>
          <button className="btn btn-danger" onClick={() => handleExitBtn(id)}>
            Exit
          </button>
        </div>
      </div>

      <div className="game-players mb-4">
        {rooms.players &&
          rooms.players
            .filter((item) => item !== user._id)
            .map((item) => <PlayerBox key={item} name="bbb" isReady={false} />)}
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
            <button className="btn btn-success" onClick={(e)=>handleReadyBtn(e)}>
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
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  stocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.object.isRequired,
  isRoomCreated: PropTypes.bool.isRequired,
  isJoined: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  rooms: state.roomReducer.rooms,
  isJoined: state.roomReducer.isJoined,
  isRoomCreated: state.roomReducer.isRoomCreated,
  stocks: state.gameReducer.stocks,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getRoom,
  formatRoom,
  exitGame,
  createGame,
  updateUser,
})(GameSetup);
