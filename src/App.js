import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import NotFound from "./components/layout/NotFound";
import PrivateRoute from "./components/routing/PrivateRoute";
import Home from "./components/home";
import GameRoom from "./components/Game/GameRoom";
import GameCreateForm from "./components/Game/GameCreateForm";
import JoinGameRoom from "./components/Game/JoinGameRoom";
import { LOGOUT } from "./constants/userConstant";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";
import GameSetup from "./components/Game/GameSetup";
import Setting from "./components/setting";
import GameResult from "./components/Game/GameResult";

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
            path="gameRoom/:id"
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
            path="game-setup/:id"
            element={<PrivateRoute component={GameSetup} />}
          />
          <Route
            path="game-result/:id"
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
