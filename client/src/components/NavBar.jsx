import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "4rem" }}>
      <Container className="d-flex justify-content-between align-items-center">
        <h2 className="m-0">
          <Link to="/" className="link-light text-decoration-none">ConnectHub</Link>
        </h2>
        <span className="text-warning">Logged in as Username</span>
        <Nav>
          <Stack>
            <Link to="/login" className="link-light text-decoration-none">Login</Link>
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
