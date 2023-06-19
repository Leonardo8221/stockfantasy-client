import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { finvizor } from "finvizor";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { formatRoom } from "../../../actions/room";
import { getRoom } from "../../../actions/room";

import "./style.css";
import PlayerBox from "../../commons/PlayerBox";

const GameSetup = ({ getRoom, formatRoom, rooms, user, isRoomCreated }) => {
  const navigated = useNavigate();

  const { id } = useParams();

  const getStocks = async () => {
    const stocks = await finvizor.stock();
    console.log(stocks);
    return stocks;
  };

  useEffect(() => {
    if (isRoomCreated) {
      formatRoom();
    }
  }, [formatRoom, isRoomCreated]);

  useEffect(() => {
    getRoom(id);
  }, [getRoom, id]);

  useEffect(() => {
    getStocks();
  }, []);

  const handleDoneBtn = (e) => {
    e.target.disabled = true;
    navigated("/gameRoom");
  };

  return (
    <section className="container p-2">
      <h1 className="large text-primary mb-4">
        Game Setup -{" "}
        <span className="text-success mb-0 text-uppercase">
          {rooms.name && rooms.name}
        </span>
      </h1>

      <div className="game-players mb-4">
        {rooms.players &&
          rooms.players
            .filter((item) => item !== user._id)
            .map((item) => <PlayerBox key={item} name="bbb" isReady={true} />)}
      </div>

      <div className="game-setup-container">
        <div className="left p-4">
          <h4>Stock List</h4>
          <div className="stock-list">
            <div className="stock-list-item">Stock1</div>
            <div className="stock-list-item">Stock2</div>
            <div className="stock-list-item">Stock3</div>
            <div className="stock-list-item">Stock4</div>
            <div className="stock-list-item">Stock5</div>
            <div className="stock-list-item">Stock6</div>
            <div className="stock-list-item">Stock7</div>
            <div className="stock-list-item">Stock8</div>
            <div className="stock-list-item">Stock9</div>
            <div className="stock-list-item">Stock10</div>
            <div className="stock-list-item">Stock11</div>
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
            <button className="btn btn-success" onClick={handleDoneBtn}>
              Done
            </button>
          </div>
          <div className="selected-stocks">
            <div className="selected-stocks-item">Stock2</div>
            <div className="selected-stocks-item">Stock3</div>
            <div className="selected-stocks-item">Stock1</div>
            <div className="selected-stocks-item">Stock4</div>
            <div className="selected-stocks-item">Stock1</div>
            <div className="selected-stocks-item">Stock4</div>
            <div className="selected-stocks-item">Stock1</div>
            <div className="selected-stocks-item">Stock4</div>
          </div>
        </div>
      </div>
    </section>
  );
};

GameSetup.propTypes = {
  getRoom: PropTypes.func.isRequired,
  formatRoom: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf().isRequired,
  user: PropTypes.object.isRequired,
  isRoomCreated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  rooms: state.roomReducer.rooms,
  user: state.auth.user,
  isRoomCreated: state.roomReducer.isRoomCreated,
});

export default connect(mapStateToProps, { getRoom, formatRoom })(GameSetup);
