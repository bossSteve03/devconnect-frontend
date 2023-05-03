import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Button,
  Form
} from 'react-bootstrap';
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedinIn,
  FaGithub
} from 'react-icons/fa';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

export function Footer() {
  return (
    <footer className='text-center bg-dark text-white'>
      <Container className='py-4'>
        <section className='mb-4'>
          <Button variant='outline-light' className='m-1' href='#!' role='button'><FaFacebookF /></Button>

          <Button variant='outline-light' className='m-1' href='#!' role='button'><FaTwitter /></Button>

          <Button variant='outline-light' className='m-1' href='#!' role='button'><FaGoogle /></Button>

          <Button variant='outline-light' className='m-1' href='#!' role='button'><FaInstagram /></Button>

          <Button variant='outline-light' className='m-1' href='#!' role='button'><FaLinkedinIn /></Button>

          <Button variant='outline-light' className='m-1' href='#!' role='button'><FaGithub /></Button>
        </section>

        <section className=''>
          <Form action=''>
            <Row className='justify-content-center'>
              <Col xs={12} md='auto'>
                <p className='pt-2'>
                  <strong>Sign up for our newsletter</strong>
                </p>
              </Col>

              <Col xs={12} md={5} className='text-md-start'>
                <Form.Group controlId='formBasicEmail' className='mb-4'>
                  <Form.Control type='email' placeholder='Email address' />
                </Form.Group>
              </Col>

              <Col xs={12} md='auto'>
                <Button variant='outline-light' type='submit' className='mb-4'>
                  Subscribe
                </Button>
              </Col>
            </Row>
          </Form>
        </section>

        <section className='mb-4'>
          <p>
          The website that I designed is centered around the theme of cat adoption/sponsorship. However, I must clarify that the website is not functional and cannot provide any real aid to cats. Its purpose is purely for showcasing my design skills, and the theme of cat adoption/sponsorship was chosen for demonstration purposes. Although the idea of cat adoption/sponsorship is noble, this website is not intended for production and should not be relied upon for any practical use in the real world.
          </p>
        </section>

        <section className=''>
          <Row>
            <Col lg={4} md={12} className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white text-decoration-none'>Link 1</a>
                </li>
                <li>
                  <a href='#!' className='text-white text-decoration-none'>Link 2</a>
                </li>
                <li>
                  <a href='#!' className='text-white text-decoration-none'>Link 3</a>
                </li>
                <li>
                  <a href='#!' className='text-white text-decoration-none'>Link 4</a>
                </li>
              </ul>
            </Col>
            <Col lg={4} md={12} className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>About</h5>
              <ul className='list-unstyled mb-0'>
                <li>
                  <Link to='/about' className='text-white text-decoration-none'>About us</Link>
                </li>
                <li>
                  <Link to='/contact' className='text-white text-decoration-none'>Contact us</Link>
                </li>
                <li>
                  <a href='#!' className='text-white text-decoration-none'>Careers</a>
                </li>
                <li>
                  <a href='#!' className='text-white text-decoration-none'>Terms of Service</a>
                </li>
              </ul>
            </Col>

            <Col lg={4} md={12} className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Help</h5>
              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white text-decoration-none'>FAQ</a>
                </li>
                <li>
                  <a href='#!' className='text-white text-decoration-none'>Support</a>
                </li>
                <li>
                  <a href='#!' className='text-white text-decoration-none'>Privacy Policy</a>
                </li>
              </ul>
            </Col>
          </Row>
        </section>
      </Container>

      <div className='text-center p-3 bg-opacity-25' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        Developed by{' '}
        <a className='text-white text-decoration-none' href='#'>
          Julia, Silvia, Jack and Steve
        </a>
      </div>
    </footer>
  )
}
