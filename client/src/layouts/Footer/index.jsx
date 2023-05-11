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

import styles from './index.module.css';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

export function Footer() {
  return (
    <footer className={`${styles['footer']} text-center text-white`}>
      <Container className='py-4'>
        <section className='mb-4'>
          <p>
          The DevConnect team is dedicated to providing a platform for like-minded individuals to connect and build projects of any scale. Join our community today and start building your next project!
          </p>
        </section>
        <section className='mb-4'>
          <Button variant='outline-light' className='m-1' href='https://www.linkedin.com' role='button'><FaLinkedinIn /></Button>

          <Button variant='outline-light' className='m-1' href='https://github.com' role='button'><FaGithub /></Button>
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
