import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

import './style.css';

const Home = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const handleGameRoom = (room) => {
    alert('Game');
  }
  return (
    <section className="container">
      <div className="home-header">
        <h1 className="large text-primary">Home</h1>
        <Link to="/create-game" className="btn btn-primary my-1">
          Create Game
        </Link>
      </div>

      <div className="home-main">
        <div className="game-rooms">
          <div className='game-room' onClick={handleGameRoom}>
            <h1>Game1</h1>
            <div className='players'>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
            </div>
            
            <div className='playing-badge playing'>Playing..</div>
          </div>
          <div className='game-room' onClick={handleGameRoom}>
            <h1>Game2</h1>
            <div className='players'>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
            </div>
            <div className='playing-badge finished'>Finished</div>

          </div>
          <div className='game-room' onClick={handleGameRoom}>
            <h1>Game3</h1>
            <div className='players'>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
            </div>
          </div>
          <div className='game-room' onClick={handleGameRoom}>
            <h1>Game2</h1>
            <div className='players'>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
            </div>
          </div>
          <div className='game-room'>
            <h1>Game2</h1>
            <div className='players'>
              <i className='fa fa-user'></i>
            </div>
          </div>
          <div className='game-room' onClick={handleGameRoom}>
            <h1>Game2</h1>
            <div className='players'>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
            </div>
          </div>
          <div className='game-room' onClick={handleGameRoom}>
            <h1>Game2</h1>
            <div className='players'>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
            </div>
          </div>
          <div className='game-room' onClick={handleGameRoom}>
            <h1>Game2</h1>
            <div className='players'>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
            </div>
          </div>
          <div className='game-room' onClick={handleGameRoom}>
            <h1>Game2</h1>
            <div className='players'>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
            </div>
          </div>
          <div className='game-room' onClick={handleGameRoom}>
            <h1>Game2</h1>
            <div className='players'>
              <i className='fa fa-user player'></i>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
              <i className='fa fa-user'></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Home.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Home
);
