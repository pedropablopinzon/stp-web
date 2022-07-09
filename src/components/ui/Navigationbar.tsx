import React from 'react';
import { Nav, Navbar, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { ProfileImage } from '../ProfileImage';
import { IconSvg } from '../IconSvg';

export const Navigationbar = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <></>;
  }

  return (
    <>
      <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
        <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav>
            <NavLink eventKey="1" as={Link} to="/">
              <IconSvg photoURL={'house-solid.svg'} width="50px" height="50px" />
              {' Home'}
            </NavLink>
            <NavLink eventKey="2" as={Link} to="/businesses">
              <IconSvg photoURL={'building-solid.svg'} width="50px" height="50px" />
              {' Empresas'}
            </NavLink>
            <NavLink eventKey="3" as={Link} to="/projects">
              <IconSvg photoURL={'sitemap-solid.svg'} width="50px" height="50px" />
              {' Proyectos'}
            </NavLink>
            <NavLink eventKey="4" as={Link} to="/checkInOut">
              <IconSvg photoURL={'check-to-slot-solid.svg'} width="50px" height="50px" />
              {' Marcar'}
            </NavLink>
            <NavLink eventKey="5" as={Link} to="/progressLog">
              <IconSvg photoURL={'list-check-solid.svg'} width="50px" height="50px" />
              {' Progreso'}
            </NavLink>
            <NavLink eventKey="6" as={Link} to="/expenseRecord">
              <IconSvg photoURL={'money-bill-trend-up-solid.svg'} width="50px" height="50px" />
              {' Gastos'}
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
