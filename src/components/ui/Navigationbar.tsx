import React from 'react';
import { Nav, Navbar, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigationbar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav>
            <NavLink eventKey="1" as={Link} to="/">
              Home
            </NavLink>
            <NavLink eventKey="2" as={Link} to="/business">
              Empresas
            </NavLink>
            <NavLink eventKey="3" as={Link} to="/projects">
              Proyectos
            </NavLink>
            <NavLink eventKey="4" as={Link} to="/checkInOut">
              Marcar
            </NavLink>
            <NavLink eventKey="5" as={Link} to="/progressLog">
              Progreso
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigationbar;
