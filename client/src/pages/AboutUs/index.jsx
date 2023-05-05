import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function AboutUs(){

  return (
    <div className={styles["page-content"]}>
    <Container className="col-xxl-8 px-4 py-5">
      <Row className="flex-lg-row-reverse align-items-center g-5 py-5">
        <Col className="col-10 col-sm-8 col-lg-6">
          <Image src="https://cdn-employer-wp.arc.dev/wp-content/uploads/2022/04/good-software-developer-1128x635.jpg" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width={700} height={500} loading="lazy" />
        </Col>
        <Col lg={6}>
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Who are we?</h1>
          <p className="lead">
          DevConnect is a platform designed to help you connect with like-minded individuals and build projects of any scale. Our community-driven approach allows you to find teammates who share your passion and vision, giving you the opportunity to gain practical experience and build your skills. Whether you're just starting out or looking to take your career to the next level, DevConnect is the perfect place to get started. Join our community today and start building your next project!
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Button as={Link} to='/' variant="primary" id={styles['brand-bs-btn']} size="lg" className="px-4 me-md-2">View active projects!</Button>
            <Button as={Link} to='/contact' variant="outline-secondary" size="lg" className="px-4">How to start</Button>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  )
}
