import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createRoom } from "../../actions/room";

const GameCreateForm = ({createRoom}) => {
  const [formData, setFormData] = useState({
    name: "",
    roomType: "random",
    players: [],
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // const [roomType, setRoomType] = useState('random');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // navigate('/game-setup')
    createRoom(formData);
  };

  return (
    <section className="container">
      <h1>Game Create</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="roomName">
          <Form.Label>Room Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter room name"
            onChange={onChange}
          />
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
            <Form.Check
              inline
              type="checkbox"
              id="roomType-private"
              label="User1"
              name="roomType"
            />
            <Form.Check
              inline
              type="checkbox"
              name="roomType"
              label="User2"
              id="roomType-random"
            />
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
};

export default connect(null, { createRoom })(GameCreateForm);
