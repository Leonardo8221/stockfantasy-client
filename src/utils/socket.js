import { io } from "socket.io-client";

let socket;
export const initiateSocketConnection = () => {
  console.log(`Connecting socket...`);
  return (socket = io("http://localhost:5000", {
    withCredentials: true,
    auth: {
			token: localStorage.getItem("token")
		},
  }));
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const addedRoomListener = (connectedSocket) => {
  if (connectedSocket) {
    return new Promise((resolve, reject) => {
      connectedSocket.on("RoomAdded", (room) => {
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
