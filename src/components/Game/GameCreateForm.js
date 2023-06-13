import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const GameCreateForm = () => {
  const [roomType, setRoomType] = useState('random');

  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value);
  };

  return (
    <section className="container">
      <h1>Game Create</h1>
      <Form>
        <Form.Group className="mb-3" controlId="roomName">
          <Form.Label>Room Name</Form.Label>
          <Form.Control
            type="text"
            name="roomName"
            placeholder="Enter room name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="roomType">
          <Form.Label>Room Type</Form.Label>
          <br />
          <Form.Check
            inline
            type="radio"
            id="roomType-private"
            value="private"
            label="Private"
            name="roomType"
            checked={roomType === 'private'}
            onChange={handleRoomTypeChange}
          />
          <Form.Check
            inline
            type="radio"
            name="roomType"
            label="Random"
            value="random"
            id="roomType-random"
            checked={roomType === 'random'}
            onChange={handleRoomTypeChange}
          />
        </Form.Group>
        {roomType === 'private' && (
          <Form.Group className="mb-3">
            <Form.Label>Invite Users</Form.Label> <br />
            <Form.Control
              type="text"
              placeholder="Serach user name"
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

export default GameCreateForm;
