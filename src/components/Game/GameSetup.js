import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import './style.css';
import { useEffect } from "react";
import { formatRoom } from "../../actions/room";

const GameSetup = ({
  isRoomCreated,
  formatRoom,
}) => {

    const navigated = useNavigate()
const handleDoneBtn = (e) => {
    e.target.disabled = true;
    navigated('/gameRoom');
}

  useEffect(() => {
    if(isRoomCreated) {
      formatRoom();
    }
  }, [isRoomCreated])

  return (
    <section className="container p-2">
      <h1 className="large text-primary mb-4">Game Setup</h1>
      <div className="game-players mb-4">
        <div className="game-player">
          <div className="user-icon">
            <i className="fa fa-user"></i>
            <span>User1</span>
          </div>
          <div className="caption">Building Portfolio...</div>
        </div>
        <div className="game-player">
          <div className="user-icon ">
            <i className="fa fa-user"></i>
            <span>User2</span>
          </div>
          <div className="caption ready">Ready</div>
        </div>
        <div className="game-player">
          <div className="user-icon">
            <i className="fa fa-user"></i>
            <span>User3</span>
          </div>
          <div className="caption ready">Ready</div>
        </div>
      </div>

      <div className="game-setup-container">
        <div className="left p-4">
          <h4>Stock List</h4>
          <div className="stock-list">
            <div className='stock-list-item'>Stock1</div>
            <div className='stock-list-item'>Stock2</div>
            <div className='stock-list-item'>Stock3</div>
            <div className='stock-list-item'>Stock4</div>
            <div className='stock-list-item'>Stock5</div>
            <div className='stock-list-item'>Stock6</div>
            <div className='stock-list-item'>Stock7</div>
            <div className='stock-list-item'>Stock8</div>
            <div className='stock-list-item'>Stock9</div>
            <div className='stock-list-item'>Stock10</div>
            <div className='stock-list-item'>Stock11</div>
          </div>
        </div>
        <div className="right p-4">
          <div className="d-flex flex-row justify-content-between align-items-center mb-3">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <p className="large text-primary mb-0">
                Budget: <span className="large text-success">$1000</span>
              </p>
            </div>
            <button className="btn btn-success" onClick={handleDoneBtn}>Done</button>
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
  isRoomCreated: PropTypes.bool,
  formatRoom: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isRoomCreated: state.roomCreateReducer.isRoomCreated,
});

export default connect(mapStateToProps, {formatRoom})(
  GameSetup
);
