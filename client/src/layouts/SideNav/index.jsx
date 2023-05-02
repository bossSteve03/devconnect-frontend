import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function SideNav() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
    <div className="d-flex flex-column flex-shrink-0 bg-light" style={{ width: '4.5rem' }}>
      <Navbar expand="lg" className="flex-column">
        <Navbar.Brand href="/" className="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
          <svg className="bi" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
          <span className="visually-hidden">Icon-only</span>
        </Navbar.Brand>
        <Nav className="nav-pills nav-flush flex-column mb-auto text-center">
          <Nav.Link href="#" className="nav-link py-3 border-bottom" aria-current="page" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
            <svg className="bi" width="24" height="24" role="img" aria-label="Home"><use xlinkHref="#home"></use></svg>
          </Nav.Link>
          <Nav.Link href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
            <svg className="bi" width="24" height="24" role="img" aria-label="Dashboard"><use xlinkHref="#speedometer2"></use></svg>
          </Nav.Link>
          <Nav.Link href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Orders">
            <svg className="bi" width="24" height="24" role="img" aria-label="Orders"><use xlinkHref="#table"></use></svg>
          </Nav.Link>
          <Nav.Link href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Products">
            <svg className="bi" width="24" height="24" role="img" aria-label="Products"><use xlinkHref="#grid"></use></svg>
          </Nav.Link>
          <Nav.Link href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Customers">
            <svg className="bi" width="24" height="24" role="img" aria-label="Customers"><use xlinkHref="#people-circle"></use></svg>
          </Nav.Link>
        </Nav>
        <NavDropdown title={<img src="https://github.com/mdo.png" alt="mdo" width="24" height="24" className="rounded-circle" />} className="dropdown border-top" alignRight>
          <NavDropdown.Item href="#">New project...</NavDropdown.Item>
          <NavDropdown.Item href="#">Settings</NavDropdown.Item>
          <NavDropdown.Item href="#">Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#">Sign out</NavDropdown.Item>
        </NavDropdown>
      </Navbar>
    </div>
    <Outlet />
    </>
  );
};
