import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getRooms, joinGame } from "../../../actions/room";
import RoomBox from "../../commons/RoomBox";

const JoinGameRoom = ({ rooms, user, isJoined, getRooms, joinGame }) => {
  const [randomRooms, setRandomRooms] = useState([]);
  const [invitedRooms, setInvitedRooms] = useState([]);
  const [roomID, setRoomID] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getRooms();
  }, [getRooms]);


  useEffect(() => {
    console.log('hahaha')
    if (rooms.length > 0) {
      setInvitedRooms(
        rooms.filter(
          (room) =>
            room.players.includes(user._id) &&
            room.roomType === "private" &&
            !room.startedDate
        )
      );
      setRandomRooms(
        rooms.filter((room) => room.roomType === "random" && !room.startedDate)
      );
    }
  }, [rooms]);
  useEffect(() => {
    if (isJoined === true) {
      navigate("/game-setup/" + roomID);
    }
  }, [isJoined]);

  const handleJoinGameRoom = (roomID) => {
    if (
      rooms.find((room) => room._id === roomID).roomType === "random" &&
      !rooms.find((room) => room._id === roomID).players.includes(user._id) &&
      rooms.find((room) => room._id === roomID).players.length >= 4
    ) {
      alert("This room is full of players");
      return;
    }
    joinGame(user._id, roomID);
    setRoomID(roomID);
  };

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
            <h3 className="mt-5 text-dark text-center no-rooms">
              There is no room in pending
            </h3>
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
            <h3 className="mt-5 text-dark text-center no-rooms">
              There is no room in pending
            </h3>
          )}
        </div>
      </div>
    </section>
  );
};

JoinGameRoom.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.object.isRequired,
  isJoined: PropTypes.string,
  getRooms: PropTypes.func,
  joinGame: PropTypes.func,
};

const mapStateToProps = (state) => ({
  rooms: state.roomReducer.rooms,
  isJoined: state.roomReducer.isJoined,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getRooms, joinGame })(JoinGameRoom);
