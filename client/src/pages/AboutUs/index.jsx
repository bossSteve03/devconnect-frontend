import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function AboutUs(){

  return (
    <Container className="col-xxl-8 px-4 py-5">
      <Row className="flex-lg-row-reverse align-items-center g-5 py-5">
        <Col className="col-10 col-sm-8 col-lg-6">
          <Image src="https://cdn-employer-wp.arc.dev/wp-content/uploads/2022/04/good-software-developer-1128x635.jpg" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width={700} height={500} loading="lazy" />
        </Col>
        <Col lg={6}>
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">An about us header!</h1>
          <p className="lead">An about us paragraph!</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Button as={Link} to='/' variant="primary" size="lg" className="px-4 me-md-2">View available roles!</Button>
            <Button as={Link} to='/contact' variant="outline-secondary" size="lg" className="px-4">Contact us</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
