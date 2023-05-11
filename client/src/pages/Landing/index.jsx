import { Container, Row, Col, Button } from 'react-bootstrap';
import project from './project.png'
import chat from './chat.png'
import calendar from './calendar.png'
import tasks from './tasks.png'
import styles from './index.module.css'

export default function Landing() {
  return (
    <div className={styles['page-content']}>
    <Container className="px-4 pt-5 text-center border-bottom">
      <h1 className="display-4 fw-bold text-body-emphasis py-5">Next gen collaboration at your fingertips</h1>
      <br />
      <Row>
        <Col lg={9} className="mx-auto">
          <p className="lead mb-4 py-5"><span className="fw-bold">Introducing <span className={styles['homepage-logo-green']}>Dev</span>Connect:</span> a collaborative platform for developers. Chat, kanban board, and calendar tools empower seamless teamwork on projects. Join now and amplify your coding collaboration!</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5 pb-5">
            <Button variant="primary" id={styles['brand-bs-btn']} size="lg" className="px-4 me-sm-3"><a href="http://localhost:5174/signup">JOIN OUR COMMUNITY!</a></Button>
          </div>
        </Col>
      </Row>
      
      <div className="overflow-hidden">
        <Container className="px-5">
          <h1 className="display-4 fw-bold text-body-emphasis py-5">Services</h1>
          <Row className="py-5">
            <Col>
              <img src={project} className="bg-transparent img-fluid rounded-3 mb-4 ps-4" alt="Project icon" width="700" height="500" loading="lazy" />
              <h5 className="text-center ps-4">Create and share a project</h5>
            </Col>
            <Col>
              <img src={tasks} className="bg-transparent img-fluid rounded-3 mb-4 ps-4" alt="Example image" width="700" height="500" loading="lazy" />
              <h5 className="text-center ps-4">Break big features in small tasks</h5>
            </Col>
            <Col>
            <img src={chat} className="bg-transparent img-fluid rounded-3 mb-4 ps-4" alt="Example image" width="700" height="500" loading="lazy" />
            <h5 className="text-center ps-4">Keep in touch with your team</h5>
            </Col>
            <Col>
            <img src={calendar} className="bg-transparent img-fluid rounded-3 mb-4 ps-4" alt="Example image" width="700" height="500" loading="lazy" />
            <h5 className="text-center ps-4">Organize important events</h5>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <br></br>

        </Container>
      </div>
    </Container>
    </div>
  )
}
