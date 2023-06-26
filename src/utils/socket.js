import { io } from "socket.io-client";
import { getRoom, getRooms } from "../actions/room";
import { getGamesByRoomID } from "../actions/game";

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

export const createdRoomListener = (socket, dispatch) => {
  if (socket) {
    return new Promise((resolve, reject) => {
      socket.on("RoomAdded", (room) => {
        if (dispatch) {
          dispatch(getRooms());
          dispatch(getRoom(room._id));
        }
        resolve(room);
      });
    });
  } else {
    console.error("Socket is undefined");
    return null;
  }
};

export const joinedRoomListener = (socket, dispatch) => {
  if (socket) {
    return new Promise((resolve, reject) => {
      socket.on("UserJoined", (room) => {
        if (dispatch) {
          dispatch(getRooms());
          dispatch(getRoom(room._id));
        }
        resolve(room);
      });
    });
  } else {
    console.error("Socket is undefined");
    return null;
  }
};
export const exitUserListener = (socket, dispatch) => {
  if (socket) {
    return new Promise((resolve, reject) => {
      socket.on("UserExited", (room) => {
        if (dispatch) {
          dispatch(getRooms());
          dispatch(getRoom(room._id));
        }
        resolve(room);
      });
    });
  } else {
    console.error("Socket is undefined");
    return null;
  }
};
export const gameReadyListener = (socket, dispatch) => {
  if (socket) {
    return new Promise((resolve, reject) => {
      socket.on("GameReady", (game) => {
        if (dispatch) dispatch(getGamesByRoomID(game.roomID));
        resolve(game);
      });
    });
  } else {
    console.error("Socket is undefined");
    return null;
  }
};
