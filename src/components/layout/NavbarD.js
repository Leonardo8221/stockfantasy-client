import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const NavbarD = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/dashboard">Home</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#" onClick={logout}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  );

  const guestLinks = (
    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  );

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <i className="fa fa-bar"></i>Stock Fantasy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      </Container>
    </Navbar>
  );
};

NavbarD.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavbarD);
