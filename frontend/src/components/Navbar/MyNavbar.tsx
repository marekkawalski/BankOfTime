import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { USER_NAME_SESSION_ATTRIBUTE_NAME } from "../../config/config";
import { Role } from "../../enums/Role";
import AuthenticationService from "../../services/AuthenticationService";
import { LogoutAndNavigateLogin } from "../../utils/LogoutAndNavigateLogin";
import ProtectedComponent from "../ProtectedComponent/ProtectedComponent";
import "./MyNavbar.scss";

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
            <div className="px-2">
              Hello, {sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)}
            </div>
            <Button className="px-2" onClick={() => LogoutAndNavigateLogin()}>
              Logout
            </Button>
          </Navbar.Text>
          <div>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
            <Navbar.Brand className="px-2 " href="#">
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
              <Form className="d-flex pb-3">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#action2">Add offer</Nav.Link>
                <Nav.Link href="#action1">Purchase offers</Nav.Link>
                <Nav.Link href="#action2">Sell offers</Nav.Link>

                <NavDropdown
                  title="My stuff"
                  id={`offcanvasNavbarDropdown-expand-${false}`}
                >
                  <NavDropdown.Header>My offers</NavDropdown.Header>
                  <NavDropdown.Item href="#action3">
                    Purchase offers
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Sell offers
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">Wallet</NavDropdown.Item>
                </NavDropdown>
                <ProtectedComponent allowedRole={Role.ADMIN}>
                  <NavDropdown
                    title="Admin"
                    id={`offcanvasNavbarDropdown-expand-${false}`}
                  >
                    <NavDropdown.Header>Manage users</NavDropdown.Header>
                    <NavDropdown.Item href="#action3">
                      All users
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Header>Manage offers</NavDropdown.Header>
                    <NavDropdown.Item href="#action4">
                      Purchase offers
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Sell offers
                    </NavDropdown.Item>
                  </NavDropdown>
                </ProtectedComponent>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;
