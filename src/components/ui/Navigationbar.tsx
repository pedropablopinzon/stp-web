import React from 'react';
import { Nav, Navbar, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { ProfileImage } from '../ProfileImage';

export const Navigationbar = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <></>;
  }

  return (
    <>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav>
            <NavLink eventKey="1" as={Link} to="/">
              <i className="fas fa-home fa-2xl mr-2"></i>
              Home
            </NavLink>
            <NavLink eventKey="2" as={Link} to="/businesses">
              <i className="fas fa-building fa-2xl mr-2"></i>
              Empresas
            </NavLink>
            <NavLink eventKey="3" as={Link} to="/projects">
              <i className="fas fa-sitemap fa-2xl mr-2"></i>
              Proyectos
            </NavLink>
            <NavLink eventKey="4" as={Link} to="/checkInOut">
              <i className="fas fa-check-to-slot fa-2xl mr-2"></i>
              Marcar
            </NavLink>
            <NavLink eventKey="5" as={Link} to="/progressLog">
              <i className="fas fa-list-check fa-2xl mr-2"></i>
              Progreso
            </NavLink>
            <NavLink eventKey="6" as={Link} to="/expenseRecord">
              <i className="fas fa-money-bill-trend-up fa-2xl mr-2"></i>
              Gastos
            </NavLink>
            <NavLink eventKey="7" as={Link} to="/profile">
              <ProfileImage photoURL={''} width="50px" height="50px" />
              {' Perfil'}
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
