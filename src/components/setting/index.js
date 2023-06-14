import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { Form, Button } from 'react-bootstrap';

const Setting = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <section className="container">
      <h1 className="large text-primary">User Settings</h1>
      <div className="d-flex gap-3">
        <div className='col-3'>
          <p>Username: {user && user.name}</p>
          <p> Email: {user && user.email}</p>
        </div>
        <div className='col-9'>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Current Password</Form.Label>
              <Form.Control type="password" placeholder="Current Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="New password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" />
            </Form.Group>
            <Button className="btn btn-primary my-1" type="submit">
              Update Password
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
};

Setting.propTypes = {
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
  Setting
);
