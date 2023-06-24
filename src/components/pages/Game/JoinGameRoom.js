import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getRooms, joinGame } from "../../../actions/room";
import RoomBox from "../../commons/RoomBox";
import { createdRoomListener, joinedRoomListener } from "../../../utils/socket";

const JoinGameRoom = () => {
  const { rooms, isJoined } = useSelector((state) => state.roomReducer);
  const { user } = useSelector((state) => state.auth);
  const socket = useSelector((state) => state.socket);
  const [randomRooms, setRandomRooms] = useState([]);
  const [invitedRooms, setInvitedRooms] = useState([]);
  const [roomID, setRoomID] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRooms());
    if (socket) {
      createdRoomListener(socket, dispatch);
      joinedRoomListener(socket, dispatch)
    }
  }, []);

  useEffect(() => {
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
  }, [rooms, user._id]);

  useEffect(() => {
    if (isJoined === true) navigate("/game-setup/" + roomID);
  }, [isJoined, navigate, roomID]);

  const handleJoinGameRoom = (roomID) => {
    if (
      rooms.find((room) => room._id === roomID).roomType === "random" &&
      !rooms.find((room) => room._id === roomID).players.includes(user._id) &&
      rooms.find((room) => room._id === roomID).players.length >= 4
    ) {
      alert("This room is full of players");
      return;
    }
    dispatch(joinGame({userID: user._id, roomID}, socket));
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
      <div className="py-2">
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

export default JoinGameRoom;
