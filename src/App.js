///
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import setAuthToken from "./utils/setAuthToken";

import Alert from "./components/layout/Alert";
import NotFound from "./components/layout/NotFound";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

import PrivateRoute from "./components/routing/PrivateRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/home";
import GameRoom from "./pages/Game/GameRoom";
import GameCreateForm from "./pages/Game/GameCreateForm";
import JoinGameRoom from "./pages/Game/JoinGameRoom";
import GameSetup from "./pages/Game/GameSetup";
import Setting from "./pages/setting";
import GameResult from "./pages/Game/GameResult";
import {
  createdRoomListener,
  disconnectSocket,
  exitUserListener,
  gameReadyListener,
  initiateSocketConnection,
  joinedRoomListener,
} from "./utils/socket";

import store from "./redux/store";
import { loadUser } from "./redux/actions/auth";
import { setSocket } from "./redux/actions/socket";
import { LOGOUT } from "./redux/constants/userConstant";

//styles
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  useEffect(() => {
    const socket = initiateSocketConnection();
    if (socket) {
      store.dispatch(setSocket(socket));
      createdRoomListener(socket, store.dispatch);
      joinedRoomListener(socket, store.dispatch);
      exitUserListener(socket, store.dispatch);
      gameReadyListener(socket, store.dispatch);
    }
    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<PrivateRoute component={Home} />} />
          <Route
            path="gameRoom/:roomID"
            element={<PrivateRoute component={GameRoom} />}
          />
          <Route
            path="create-game"
            element={<PrivateRoute component={GameCreateForm} />}
          />
          <Route
            path="join-room"
            element={<PrivateRoute component={JoinGameRoom} />}
          />
          <Route
            path="game-setup/:roomID"
            element={<PrivateRoute component={GameSetup} />}
          />
          <Route
            path="game-result/:roomID"
            element={<PrivateRoute component={GameResult} />}
          />
          <Route
            path="user-setting"
            element={<PrivateRoute component={Setting} />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
