import { io } from "socket.io-client";
import { getRooms } from "../actions/room";

let socket;
export const initiateSocketConnection = () => {
  console.log(`Connecting socket...`);
  return (socket = io("http://localhost:5000", {
    withCredentials: true,
  }));
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const addedRoomListener = (socket, dispatch) => {
  if (socket) {
    return new Promise((resolve, reject) => {
      socket.on("RoomAdded", (room) => {
        console.log("RoomAdded ", room);
        if (dispatch) dispatch(getRooms());
        resolve(room);
      });
    });
  } else {
    console.error("Socket is undefined");
    return null;
  }
};

export const getRoomRequest = (roomID) => {
  socket.emit("GetRoom", roomID);
};
