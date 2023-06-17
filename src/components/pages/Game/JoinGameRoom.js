import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getRooms } from "../../../actions/room";
import RoomBox from "../../commons/RoomBox";

const JoinGameRoom = ({ rooms, user, getRooms }) => {
  const [randomRooms, setRandomRooms] = useState([]);
  const [invitedRooms, setInvitedRooms] = useState([]);

  const navigate = useNavigate();
  const handleJoinGameRoom = (val) => {
    navigate("/game-setup/" + val );
  };

  useEffect(() => {
    getRooms(false);
  }, [getRooms]);

  useEffect(() => {
    if (rooms.length) {
      setInvitedRooms(rooms.filter((room) => room.players.includes(user._id) && room.roomType === "private"));
      setRandomRooms(rooms.filter((room) => room.roomType === "random"));
    }
  }, [rooms, user._id]);

  return (
    <section className="container">
      <h1 className="large text-primary mb-4">Join Room</h1>

      <div className="mb-4">
        <h4>Invited Rooms</h4>
        <div className="game-rooms">
          {invitedRooms.length > 0 ? (
            invitedRooms.map((room) => (
              <RoomBox
                onClick={() => handleJoinGameRoom(room._id)}
                key={room._id}
                page="join"
                {...room}
              />
            ))
          ) : (
            <h3 className="mt-5 text-dark">There is no room in progess</h3>
          )}
        </div>
      </div>
      <hr className="divider" />
      <div className="">
        <h4>Random Rooms</h4>
        <div className="game-rooms">
          {randomRooms.length > 0 ? (
            randomRooms.map((room) => (
              <RoomBox
                onClick={() => handleJoinGameRoom(room._id)}
                key={room._id}
                page="join"
                {...room}
              />
            ))
          ) : (
            <h3 className="mt-5 text-dark text-center">There is no room in progess</h3>
          )}
        </div>
      </div>
    </section>
  );
};

JoinGameRoom.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.object.isRequired,
  getRooms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  rooms: state.roomReducer.rooms,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getRooms })(JoinGameRoom);
