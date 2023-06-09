import { Outlet } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Footer } from '../Footer';
import { BrandName } from '../../components'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import styles from './index.module.css';

export default function LandingNav() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar variant="dark" expand="lg" id={styles['Navbar']}>
      <div className="container-fluid">
        <div className='d-flex flex-row'>
          <Navbar.Brand><BrandName as={Link} to="/" /></Navbar.Brand>
          <Navbar.Text className="text-light">Unleash your potential</Navbar.Text>
        </div>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto mb-2 mb-lg-0 me-lg-0 me-sm-2 text-center justify-content-end" defaultActiveKey='home'>
            <Nav.Link as={Link} to="/" exact eventKey='home'>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" eventKey='about'>About</Nav.Link>
            <Nav.Link as={Link} to="/login" eventKey='login'>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
    <div className={styles['outlet']}>
      <Outlet />
    </div>
    <Footer />
    </>
  );
}
