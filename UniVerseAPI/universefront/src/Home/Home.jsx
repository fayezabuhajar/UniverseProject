import { Link } from 'react-router-dom';
import { Navbar, Container, Row, Col, Form, FormControl, Button, Nav, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <>
      {/* شريط التنقل */}
      <Navbar expand="lg" bg="light" className="shadow-sm px-4 py-3 sticky-top">
        <Container>
          {/* استخدم as={Link} مع to */}
          <Navbar.Brand as={Link} to="/Home" className="fw-bold text-dark">
            UniVerse
          </Navbar.Brand>

          <Form className="d-flex mx-4 flex-grow-1">
            <FormControl
              type="search"
              placeholder="Search for anything"
              className="me-2 rounded-pill"
            />
          </Form>

          <Nav>
            <Nav.Link as={Link} to="/Reels" className="text-dark">
              Explore
            </Nav.Link>
            <Nav.Link as={Link} to="/UniverseBusiness" className="text-dark">
              UniVerse Business
            </Nav.Link>
            
            <Nav.Link as={Link} to="/login" variant="primary"  style={{
    backgroundColor: '#007bff', // الأزرق الأساسي
    color: 'white',
    border: 'none',
    textAlign: 'center',
  }} className="btn btn-primary">
              Login
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    <Container fluid className="home-after-login px-5 py-4">
  {/* Section: Promo Banner */}
  <Row className="mb-5 promo-banner rounded p-4 position-relative" style={{ maxHeight: '380px' }}>
    <img
      src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/56a139ab-e87c-48c1-83e8-811e982da95b.jpg"
      alt="Promo"
      className="img-fluid w-100 h-100"
      style={{ objectFit: 'cover', maxHeight: '380px' }}
    />
    <div
      className="text-BLACK"
      style={{
        position: 'absolute',
        top: '20px',
        left: '30px',
        right: '20px',
        padding: '20px',
        borderRadius: '8px',
      }}
    >
      <h2 className="fw-bold mb-3">Learn, teach, and grow with UniVerse</h2>
      <p className="mb-3">
        A complete platform to master skills, share knowledge, and inspire success — all in one place
      </p>
      <Button variant="primary" className="btn-purple">Register</Button>
    </div>
  </Row>
</Container>


<Container className="py-4">
  <Row className="align-items-stretch" style={{ minHeight: '300px' }}>
    {/* صورة الطالب */}
    <Col md={6} className="d-flex align-items-center" style={{ maxHeight: '300px' }}>
      <Card
        style={{
          backgroundColor: '#13357B',
          color: 'white',
          borderRadius: '12px',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        <Row className="p-3">
          <Col xs={12}>
            <img
              src="https://www.thenation.com/wp-content/uploads/2024/07/GettyImages-1993689821-810x510.jpg"
              alt="Gaza Program"
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '10px'
              }}
            />
          </Col>

          <Col xs={12} className="mt-2">
            <h5 className="fw-bold mb-1">Gaza Program</h5>
            <p className="mb-2" style={{ fontSize: '0.9rem' }}>
              Now from UniVerse, free courses for our people in Gaza.
            </p>
            <Button
              style={{
                backgroundColor: '#FFA84B',
                color: '#fff',
                border: 'none',
                fontSize: '0.9rem'
              }}
              className="px-3 py-1 rounded"
            >
              Comig soon
            </Button>
          </Col>
        </Row>
      </Card>
      </Col>

    {/* البطاقة التعريفية */}
    <Col md={6} className="d-flex align-items-center" style={{ maxHeight: '300px' }}>
      <Card
        style={{
          backgroundColor: '#13357B',
          color: 'white',
          borderRadius: '12px',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        <Row className="p-3">
          <Col xs={12}>
            <img
              src="/Images/kdgoego.jpg"
              alt="KDGO Program"
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '10px'
              }}
            />
          </Col>

          <Col xs={12} className="mt-2">
            <h5 className="fw-bold mb-1">Kdgo Program</h5>
            <p className="mb-2" style={{ fontSize: '0.9rem' }}>
              Learn to code the fun way with KDGO – your child's first step into the world of creativity and technology!
            </p>
            <Button
              style={{
                backgroundColor: '#FFA84B',
                color: '#fff',
                border: 'none',
                fontSize: '0.9rem'
              }}
              className="px-3 py-1 rounded"
            >
              Comig soon
            </Button>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>
</Container>




      

      <div className="container text-center mt-4">
        <h2>Learn smarter, not harder</h2>
        
      </div>

      <div className="container mt-4">
  <Row>
    <Col md={12} className="ms-auto text-start">
      <p>
        <strong>UniVerse</strong> is an innovative learning platform designed to boost student success in exams by connecting learners with high-achieving peers who excel in specific subjects. Instead of traditional tutoring, empowers outstanding students to become instructors, offering peer-to-peer learning experiences that are relatable, practical, and focused on actual exam content. Whether you're struggling to pass or aiming to excel, UniVerse helps you study smarter through personalized sessions, targeted practice, and a supportive academic community.
      </p>
    </Col>
  </Row>
</div>

    </>
  );
}

export default Home;
