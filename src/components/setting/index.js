import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updatePassword } from "../../actions/auth";
import { Form, Button } from "react-bootstrap";
import { setAlert } from "../../actions/alert";

const Setting = ({ setAlert, updatePassword, auth: { user } }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { oldPassword, newPassword, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setAlert("Passwords do not match", "danger");
    } else {
      updatePassword({ oldPassword, newPassword });
      setFormData({
        ...formData,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };
  return (
    <section className="container">
      <h1 className="large text-primary mb-4">User Settings</h1>
      <div className="d-flex gap-3">
        <div className="col-3">
          <p>Username: {user && user.name}</p>
          <p> Email: {user && user.email}</p>
        </div>
        <div className="col-9">
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Old Password"
                name="oldPassword"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New password"
                name="newPassword"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                onChange={onChange}
              />
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
  updatePassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, updatePassword })(Setting);
