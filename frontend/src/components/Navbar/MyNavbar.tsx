import './MyNavbar.scss';

import ProtectedComponent from '@/components/ProtectedComponent/ProtectedComponent';
import { Role } from '@/enums/Role';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useLocation } from 'react-router-dom';

import LoginLogout from './LoginLogout';

function MyNavbar() {
  const location = useLocation();

  return (
    <>
      <Navbar
        bg={location.pathname.includes("login") ? "bright" : "dark"}
        expand="false"
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
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <ProtectedComponent>
                  <Nav.Link as={Link} to="/sellOffers">
                    Sell offers
                  </Nav.Link>
                  <Nav.Link as={Link} to="/purchaseOffers">
                    Purchase offers
                  </Nav.Link>
                  <Nav.Link as={Link} to="/createOffer">
                    Create offer
                  </Nav.Link>
                  <NavDropdown
                    title="My stuff"
                    id={`offcanvasNavbarDropdown-expand-${false}`}
                  >
                    <NavDropdown.Header>Offers</NavDropdown.Header>
                    <NavDropdown.Item as={Link} to="/appUserOffers">
                      My offers
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/appUserChosenOffers">
                      Chosen offers
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/appUser">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/">
                      Wallet
                    </NavDropdown.Item>
                  </NavDropdown>
                  <ProtectedComponent allowedRole={Role.ROLE_ADMIN}>
                    <NavDropdown
                      title="Admin"
                      id={`offcanvasNavbarDropdown-expand-${false}`}
                    >
                      <NavDropdown.Header>Users</NavDropdown.Header>
                      <NavDropdown.Item as={Link} to="/admin/manage-users">
                        Manage users
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Header>Offers</NavDropdown.Header>
                      <NavDropdown.Item as={Link} to="/">
                        Manage offers
                      </NavDropdown.Item>
                    </NavDropdown>
                  </ProtectedComponent>
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
