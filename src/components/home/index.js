import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.css";

import { getRooms } from "../../actions/room";
import TimeCounter from "../TimeCounter";

const Home = ({ rooms, getRooms }) => {
  const navigate = useNavigate();

  const roomRef = useRef();

  useEffect(() => {
    getRooms(false);
  }, []);

  const handleViewGame = (val) => {
    navigate(val);
  };
  return (
    <section className="container">
      <div className="home-header">
        <h1 className="large text-primary mb-4">Home</h1>
        <div>
          <Link to="/join-room" className="btn btn-success my-1">
            Join Room
          </Link>
          <Link to="/create-game" className="btn btn-primary my-1">
            Create Game
          </Link>
        </div>
      </div>

      <div className="home-main">
        <h3>The List of Rooms in progress</h3>

        <div className="game-rooms">
          {rooms.length > 0 &&
            rooms
              .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
              .map((room) => (
                <div
                  className="game-room"
                  onClick={() => handleViewGame(`/game-result/${room._id}`)}
                  key={room._id}
                >
                  <h3>{room.name}</h3>
                  {room.endDate ? (
                    <>
                      <h6 className="text-dark">
                        <TimeCounter />
                      </h6>
                      <p className="room-badge playing">Playing...</p>
                    </>
                  ) : (
                    <>
                      <h4 className="text-success">
                        Finished <i className="fa fa-check" />
                      </h4>
                      <p className="room-badge finished">Finshed</p>
                    </>
                  )}
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

Home.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  getRooms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  rooms: state.roomReducer.room,
});

export default connect(mapStateToProps, { getRooms })(Home);
