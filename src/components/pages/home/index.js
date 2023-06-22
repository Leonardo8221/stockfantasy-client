import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRooms } from "../../../actions/room";
import RoomBox from "../../commons/RoomBox";

import "./style.css";

const Home = ({ rooms, getRooms }) => {
  const [orderedRooms, setOrderedRooms] = useState([]);
  const navigate = useNavigate();

  const handleViewGame = (val) => {
    navigate(val);
  };

  useEffect(() => {
    getRooms(true);
  }, []);

  useEffect(() => {
    if (rooms.length>0) {
      const finishedRooms = rooms.filter(
        (room) => room.endDate  && room.startedDate
      );
      const playingRooms = rooms.filter(
        (room) => !room.endDate  && room.startedDate
      );

      finishedRooms.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
      setOrderedRooms([...finishedRooms, ...playingRooms]);
    }
  }, [rooms]);

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

      <div className="game-rooms">
        {orderedRooms.length > 0 ? (
          orderedRooms.map((room) => (
            <RoomBox
              key={room._id}
              onClick={() =>
                handleViewGame(
                  `/${room.endDate ? "game-result" : "gameRoom"}/${room._id}`
                )
              }
              page="home"
              {...room}
            />
          ))
        ) : (
          <h3 className="mt-5 text-dark no-rooms">
            There is no room in progess
          </h3>
        )}
      </div>
    </section>
  );
};

Home.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  getRooms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  rooms: state.roomReducer.rooms,
});

export default connect(mapStateToProps, { getRooms })(Home);
