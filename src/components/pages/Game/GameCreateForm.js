/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { Form, Button, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { createRoom } from "../../../actions/room";
import { getAllUers } from "../../../actions/user";

const GameCreateForm = () => {
  const { users } = useSelector((state) => state.userReducer);
  const { room, isRoomCreated } = useSelector((state) => state.roomReducer);
  const { user } = useSelector((state) => state.auth);
  const socket = useSelector((state) => state.socket);

  const [validated, setValidated] = useState(false);
  const [isPlayersFull, setIsPlayersFull] = useState(false);
  const [isToastShow, setIsToastShow] = useState(false);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    roomType: "random",
    players: [],
  });
  const [searchTerm, setSearchTerm] = useState("");

  const navigator = useNavigate();

  //Fetch users from the server
  useEffect(() => {
    dispatch(getAllUers());
  }, [dispatch]);

  useEffect(() => {
    if (formData.players.length === 3) {
      setIsToastShow(true);
      setIsPlayersFull(true);
    } else {
      setIsPlayersFull(false);
      setIsToastShow(false);
    }
  }, [formData.players.length]);

  useEffect(() => {
    if (isRoomCreated && room) {
      navigator("/game-setup/" + room._id);
    }
  }, [isRoomCreated, navigator, room]);

  //Handels the form values changing events
  const onChange = (e) => {
    if (e.target.name === "players") {
      let index = formData.players.indexOf(e.target.value);
      if (index !== -1) formData.players.splice(index, 1);
      else {
        // setIsUserChecked(true);
        formData.players.push(e.target.value);
      }
      setFormData({
        ...formData,
        players: formData.players,
      });
    } else setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Handles the selected user box close event
  const handleSeletedUserClose = (e, id) => {
    e.preventDefault();
    let newArray = formData.players.filter((item) => item !== id);
    // formData.players = ;
    setFormData({
      ...formData,
      players: newArray,
    });
  };

  //Handles the search event
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    users.filter((item) => item.name !== event.target.value);
  };

  //Filtered users
  const filteredUsers = users.filter((item) => {
    return (
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      item._id !== user._id
    );
  });

  //Handles the submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    const newRoom = { ...formData, creater: user?._id };
    if (socket) {
      dispatch(createRoom(newRoom, socket));
    }

    setValidated(true);
  };

  return (
    <section className="container">
      <Toast
        onClose={() => setIsToastShow(false)}
        show={isToastShow}
        delay={3000}
        autohide
        bg="warning"
        style={{ position: "fixed", top: "10%", right: "1%" }}
      >
        <Toast.Body style={{ color: "#fff", fontSize: "1.2rem" }}>
          You can't invite more than three users.
        </Toast.Body>
      </Toast>
      <h1 className="large text-primary mb-4">Game Create</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="roomName">
          <Form.Label>Room Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter room name"
            onChange={onChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Insert Room Name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="roomType">
          <Form.Label>Room Type</Form.Label>
          <br />
          <Form.Check
            inline
            type="radio"
            name="roomType"
            label="Random"
            value="random"
            id="roomType-random"
            checked={formData.roomType === "random"}
            onChange={onChange}
          />
          <Form.Check
            inline
            type="radio"
            id="roomType-private"
            value="private"
            label="Private"
            name="roomType"
            checked={formData.roomType === "private"}
            onChange={onChange}
          />
        </Form.Group>
        {formData.roomType === "private" && (
          <Form.Group className="mb-3">
            <Form.Label>Invite Users</Form.Label> <br />
            <Form.Control
              type="text"
              placeholder="Search User by username or email"
              className="mb-2"
              name="searchTerm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <p className="text-muted text-primary text-end mb-2">
              {formData.players.length} user selected
            </p>
            <div className="d-flex gap-3 mb-4">
              {formData.players.map((userID) => (
                <div className="d-flex gap-4 slected-user" key={userID}>
                  <div className="user-info">
                    <p className="mb-0 name">
                      {users.find((obj) => obj._id === userID).name}
                    </p>
                    <p className="text-muted mb-0">
                      {users.find((obj) => obj._id === userID).email}
                    </p>
                  </div>
                  <a
                    className="text-dark"
                    href="#"
                    onClick={(e) => handleSeletedUserClose(e, userID)}
                  >
                    <i className="fa fa-times"></i>
                  </a>
                </div>
              ))}
            </div>
            {filteredUsers.length ? (
              filteredUsers.map((user) => (
                <Form.Check
                  inline
                  type="checkbox"
                  id={user._id}
                  label={
                    <div>
                      <div>{user.name}</div>
                      <div className="text-muted">{user.email}</div>
                    </div>
                  }
                  name="players"
                  key={user._id}
                  value={user._id}
                  onChange={onChange}
                  checked={
                    formData.players.find((item) => item === user._id)
                      ? true
                      : false
                  }
                  disabled={isPlayersFull}
                />
              ))
            ) : (
              <p className="text-center text-danger">
                There are no users who has that name or email
              </p>
            )}
          </Form.Group>
        )}
        <Button className="mt-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </section>
  );
};

export default GameCreateForm;
