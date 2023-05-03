import { Outlet } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Footer } from '../Footer';
import { BrandName } from '../../components'
import './index.modules.css'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function LandingNav() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
      <div className="container-fluid">
        <div className='d-flex flex-row align-items-center'>
          <Navbar.Brand as={Link} to="/"><BrandName /></Navbar.Brand>
          <Navbar.Text className="text-dark">Unleash your potential</Navbar.Text>
        </div>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto mb-2 mb-lg-0 text-center justify-content-lg-end">
            <Nav.Link as={Link} to="/" exact>Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
    <Outlet />
    <Footer />
    </>
  )
}
