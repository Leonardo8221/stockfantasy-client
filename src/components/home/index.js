import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleViewGame = (room) => {
    navigate('/gameRoom');
  };
  return (
    <section className="container">
      <div className="home-header">
        <h1 className="text-primary">Home</h1>
        <div>
          <Link to="/join-room" className="btn btn-success my-1">
            Join Room
          </Link>
          <Link to="/create-game" className="btn btn-primary my-1">
            Create Game
          </Link>
        </div>
      </div>

      <div className="home-main">
        <h3>The List of Rooms in progress</h3>
        <div className="game-rooms">
          <div className="game-room" onClick={handleViewGame}>
            <h1>Game1</h1>
            <div className="players">
              <i className="fa fa-user"></i>
              <i className="fa fa-user"></i>
              <i className="fa fa-user"></i>
              <i className="fa fa-user"></i>
            </div>
            <div className="room-badge finished">Finshed</div>
          </div>
          <div className="game-room" onClick={handleViewGame}>
            <h1>Game2</h1>
            <div className="players">
              <i className="fa fa-user"></i>
              <i className="fa fa-user"></i>
              <i className="fa fa-user"></i>
              <i className="fa fa-user"></i>
            </div>
            <div className="room-badge playing">Playing...</div>
          </div>
          <div className="game-room" onClick={handleViewGame}>
            <h1>Game3</h1>
            <div className="players">
              <i className="fa fa-user"></i>
              <i className="fa fa-user"></i>
              <i className="fa fa-user"></i>
              <i className="fa fa-user"></i>
            </div>
            <div className="room-badge playing">Playing...</div>
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
