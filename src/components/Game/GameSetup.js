import './style.css';
const GameSetup = () => {
  return (
    <section className="container">
      <h2 className="text-primary mb-4">Game Setup</h2>
      <div className="game-players mb-4">
        <div className="game-player">
          <div className="user-icon">
            <i className="fa fa-user"></i>
            <span >User1</span>
          </div>
          <div className="caption">Building Portfolio...</div>
        </div>
        <div className="game-player">
          <div className="user-icon ">
            <i className="fa fa-user"></i>
            <span>User2</span>
          </div>
          <div className="caption ready">Ready</div>
        </div>
        <div className="game-player">
          <div className="user-icon">
            <i className="fa fa-user"></i>
            <span >User3</span>
          </div>
          <div className="caption">Building Portfolio...</div>
        </div>
      </div>

      <div className='game-setup-container'>
        <div className='left'>

        </div>
        <div className='right'>

        </div>
      </div>
    </section>
  );
};

export default GameSetup;
