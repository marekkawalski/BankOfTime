import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { Role } from "../../enums/Role";
import ProtectedComponent from "../ProtectedComponent/ProtectedComponent";
import "./MyNavbar.scss";
import LoginLogout from "./LoginLogout";

function MyNavbar() {
  return (
    <>
      <Navbar
        bg="dark"
        expand={false}
        className="mb-3 "
        fixed="top"
        variant="dark"
      >
        <Container fluid className="navbar-container ">
          <Navbar.Text className=" navbar-container-child hide">
            <LoginLogout />
          </Navbar.Text>
          <div>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
            <Navbar.Brand className="px-2 " as={Link} to="/">
              Bank of Time
            </Navbar.Brand>
          </div>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="start"
            className="navbar-dark bg-dark "
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-${false}`}
                className="text-light"
              >
                Bank of Time
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ProtectedComponent>
                <Form className="d-flex pb-3">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </ProtectedComponent>

              <Nav className="justify-content-end flex-grow-1 pe-3">
                <ProtectedComponent>
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/createOffer">
                    Create offer
                  </Nav.Link>
                  <Nav.Link as={Link} to="/">
                    Purchase offers
                  </Nav.Link>
                  <Nav.Link as={Link} to="/">
                    Sell offers
                  </Nav.Link>

                  <NavDropdown
                    title="My stuff"
                    id={`offcanvasNavbarDropdown-expand-${false}`}
                  >
                    <NavDropdown.Header>My offers</NavDropdown.Header>
                    <NavDropdown.Item as={Link} to="/">
                      Purchase offers
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/">
                      Sell offers
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/">
                      Wallet
                    </NavDropdown.Item>
                  </NavDropdown>
                  <ProtectedComponent allowedRole={Role.ADMIN}>
                    <NavDropdown
                      title="Admin"
                      id={`offcanvasNavbarDropdown-expand-${false}`}
                    >
                      <NavDropdown.Header>Manage users</NavDropdown.Header>
                      <NavDropdown.Item as={Link} to="/">
                        All users
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/">
                        Create user
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Header>Manage offers</NavDropdown.Header>
                      <NavDropdown.Item as={Link} to="/">
                        Purchase offers
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/">
                        Sell offers
                      </NavDropdown.Item>
                    </NavDropdown>
                  </ProtectedComponent>
                </ProtectedComponent>
                <Nav.Link as={Link} to="/about">
                  About
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;
