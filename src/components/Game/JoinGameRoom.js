import { useNavigate } from 'react-router-dom';

const JoinGameRoom = () => {
  const navigate = useNavigate();
  const handleJoinGameRoom = (room) => {
    navigate('/game-setup');
  };

  return (
    <section className="container">
      <h1 className="large text-primary mb-4">Join Room</h1>

      <div className="mb-4">
        <h4>Invited Rooms</h4>
        <div className="game-rooms">
          <div className="game-room" onClick={handleJoinGameRoom}>
            <h1>Game3</h1>
            <div className="players">
              <i className="fa fa-user"></i>
              <i className="fa fa-user"></i>
            </div>
            <div className="room-badge pending">Pending...</div>
          </div>
          <div className="game-room" onClick={handleJoinGameRoom}>
            <h1>Game2</h1>
            <div className="players">
              <i className="fa fa-user"></i>
              <i className="fa fa-user"></i>
              <i className="fa fa-user"></i>
            </div>
            <div className="room-badge pending">Pending...</div>
          </div>
        </div>
      </div>
      <hr className="divider" />
      <div className="">
        <h4>Random Rooms</h4>
        <div className="game-rooms">
          <div className="game-room" onClick={handleJoinGameRoom}>
            <h1>Game1</h1>
            <div className="players">
              <i className="fa fa-user"></i>
            </div>
            <div className="room-badge pending">Pending...</div>
          </div>
          <div className="game-room" onClick={handleJoinGameRoom}>
            <h1>Game2</h1>
            <div className="players">
              <i className="fa fa-user"></i>
              <i className="fa fa-user"></i>
              <i className="fa fa-user"></i>
            </div>
            <div className="room-badge pending">Pending...</div>
          </div>
          <div className="game-room" onClick={handleJoinGameRoom}>
            <h1>Game3</h1>
            <div className="players">
              <i className="fa fa-user"></i>
              <i className="fa fa-user"></i>
              <div className="room-badge pending">Pending...</div>
            </div>
          </div>
          <div className="game-room" onClick={handleJoinGameRoom}>
            <h1>Game2</h1>
            <div className="players">
              <i className="fa fa-user"></i>
              <i className="fa fa-user"></i>
              <i className="fa fa-user"></i>
            </div>
            <div className="room-badge pending">Pending...</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinGameRoom;
