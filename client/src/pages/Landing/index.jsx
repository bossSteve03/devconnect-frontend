import { Container, Row, Col, Button } from 'react-bootstrap';
import loginss from './loginss.png'
import styles from './index.module.css'

export default function Landing() {
  return (
    <div className={styles['page-content']}>
    <Container className="px-4 pt-5 text-center border-bottom">
      <h1 className="display-4 fw-bold text-body-emphasis">Next gen collaboration at your fingertips</h1>
      <br />
      <Col lg={6} className="mx-auto">
        <p className="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
          <Button variant="primary" id={styles['brand-bs-btn']} size="lg" className="px-4 me-sm-3">Primary button</Button>
          <Button variant="outline-secondary" size="lg" className="px-4">Secondary</Button>
        </div>
      </Col>
      <div className="overflow-hidden" style={{maxHeight: "30vh"}}>
        <Container className="px-5">
          <img src={loginss} className="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width="700" height="500" loading="lazy" />
        </Container>
      </div>
    </Container>
    </div>
  )
}
