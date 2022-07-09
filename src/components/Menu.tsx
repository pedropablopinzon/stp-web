import React from 'react';
import { Card, Navbar, Nav, Container } from 'react-bootstrap';

export default function Menu() {
  return (
    <>
      <Nav fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link href="/business">Empresas</Nav.Link>
          {/* <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link> */}
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/home">Controles</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/business">Empresas</Nav.Link>
              <Nav.Link href="/projects">Proyectos</Nav.Link>
              <Nav.Link href="/checkInOut">Marcar</Nav.Link>
            </Nav>
          </Container>
        </Navbar> */}

        {/* <Card>
          <Card.Body> */}
        {/* <h2 className="text-center mb-4">Menu</h2> */}
        {/* <MenuButton
              text="Check In - Check Out"
              url="/checkInOut"
              variant={"success"}
            /> */}
        {/* </Card.Body>
        </Card> */}
      {/* </header> */}
    </>
  );
}
