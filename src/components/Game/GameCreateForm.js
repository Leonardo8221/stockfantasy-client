import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createRoom } from "../../actions/room";
import { getAllUers } from "../../actions/user";

const GameCreateForm = ({
  createRoom,
  getAllUers,
  room,
  users,
  isRoomCreated,
  // isLoadedUsers,
}) => {
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAllUers();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    roomType: "random",
    players: [],
  });

  const onChange = (e) => {
    if (e.target.name === "players") {
      let index = formData.players.indexOf(e.target.value);
      if (index !== -1) formData.players.splice(index, 1);
      else formData.players.push(e.target.value);
      setFormData({
        ...formData,
        players: formData.players,
      });
    } else setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    createRoom(formData);
    setValidated(true);
  };
  if (isRoomCreated) {
    // navigate("/game-setup/" + room._id);
  }
  return (
    <section className="container">
      <h1>Game Create</h1>
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
              placeholder="Serach User"
              className="mb-2"
            />

            <p className="text-muted text-primary mb-4">{formData.players.length} user selected</p>

            {users.length ? (
              users.map((user) => (
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
                />
              ))
            ) : (
              <p>Loading...</p>
            )}
          </Form.Group>
        )}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </section>
  );
};

GameCreateForm.propTypes = {
  createRoom: PropTypes.func.isRequired,
  getAllUers: PropTypes.func.isRequired,
  room: PropTypes.object,
  users: PropTypes.arrayOf(PropTypes.object),
  isRoomCreated: PropTypes.bool,
  // isLoadedUsers: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  room: state.roomCreateReducer.room,
  users: state.getAllUsersReducer.users,
  isRoomCreated: state.roomCreateReducer.isRoomCreated,
  // isLoadedUsers: state.getAllUsersReducer.isLoadedUsers,
});

export default connect(mapStateToProps, { createRoom, getAllUers })(
  GameCreateForm
);
