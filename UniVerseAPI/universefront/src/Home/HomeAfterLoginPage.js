import  { useState } from 'react';
import { Navbar, Container, Row, Col, Form, FormControl, Button, Nav } from 'react-bootstrap';



  
const HomeAfterLoginPage = () => {

  
  const [university, setUniversity] = useState('');
  const [college, setCollege] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [course, setCourse] = useState('');

  const universities = ['University of Jordan', 'Yarmouk University', 'Mutah University'];

  const colleges = {
    'University of Jordan': ['Engineering College', 'Science College', 'IT College'],
    'Yarmouk University': ['Computer Science College', 'Business College'],
    'Mutah University': ['Education College', 'Arts College']
  };

  const specializations = {
    'Engineering College': ['Electrical Engineering', 'Civil Engineering', 'Computer Engineering'],
    'Science College': ['Mathematics', 'Physics'],
    'IT College': ['Computer Science', 'Information Technology', 'Software Engineering', 'Cybersecurity', 'Data Science'],
    'Computer Science College': ['Computer Science', 'Cybersecurity'],
    'Business College': ['Business Administration'],
    'Education College': ['Special Education'],
    'Arts College': ['Arabic Language']
  };

  const courses = {
    'Computer Science': ['Data Structures', 'Algorithms', 'Operating Systems', 'Programming Languages', 'Computer Architecture'],
    'Information Technology': ['Networking Fundamentals', 'Cloud Computing', 'IT Project Management', 'Database Administration'],
    'Software Engineering': ['Software Design', 'Agile Development', 'Testing & QA', 'Software Project Management'],
    'Cybersecurity': ['Ethical Hacking', 'Network Security', 'Cryptography', 'Digital Forensics'],
    'Data Science': ['Python for Data Analysis', 'Big Data Tools', 'Data Visualization', 'Machine Learning'],
    'Computer Engineering': ['Digital Logic Design', 'Microprocessors', 'Embedded Systems'],
    'Mathematics': ['Calculus', 'Linear Algebra'],
    'Arabic Language': ['Grammar', 'Rhetoric'],
    'Business Administration': ['Organizational Behavior', 'Marketing'],
    'Special Education': ['Learning Disabilities', 'Classroom Management']
  }

  return (
    <>{/* Navbar */}
    <Navbar expand="lg" bg="light" className="shadow-sm px-4 py-3 sticky-top">
        <Navbar.Brand href="#" className="fw-bold text-dark">UniVerse</Navbar.Brand>
        <Form className="d-flex mx-4 flex-grow-1">
          <FormControl
            type="search"
            placeholder="Search for anything"
            className="me-2 rounded-pill"
          />
        </Form>
        <Nav>
          <Nav.Link href="#" className="text-dark">Explore</Nav.Link>
          <Nav.Link href="#" className="text-dark">UniVerse Business</Nav.Link>

          <Nav.Link href="/TeachWithUsPage" className="text-dark">Teach on UniVerse</Nav.Link>          
        </Nav>
      </Navbar>
    

      {/* Main Section */}

    <Container fluid className="home-after-login px-5 py-4">
      {/* Section: Promo Banner */}
      <Row className="align-items-center mb-5 promo-banner rounded shadow-sm p-4">
        <Col md={6}>
          <h2 className="fw-bold mb-3">Go further in web development</h2>
          <p className="text-muted mb-3">
            Subscribe to a collection of our top courses in Javascript, CSS, React, and more with Personal Plan.
          </p>
          <Button variant="primary" className="btn-purple">Try it free</Button>
        </Col>
        <Col md={6} className="text-end">
          <img src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/6caba229-b963-4af8-84b8-f71693be2507.jpg" alt="Promo" className="img-fluid" style={{ maxHeight: '280px' }} />
        </Col>
      </Row>

      {/* Selection Filters */}
        <Row className="bg-white p-4 rounded shadow-sm">
          <Col md={3}>
            <Form.Select value={university} onChange={(e) => {
              setUniversity(e.target.value);
              setCollege('');
              setSpecialization('');
              setCourse('');
            }}>
              <option value="">Select university</option>
              {universities.map((u, i) => (
                <option key={i} value={u}>{u}</option>
              ))}
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Select value={college} onChange={(e) => {
              setCollege(e.target.value);
              setSpecialization('');
              setCourse('');
            }} disabled={!university}>
              <option value="">Select college</option>
              {(colleges[university] || []).map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Select value={specialization} onChange={(e) => {
              setSpecialization(e.target.value);
              setCourse('');
            }} disabled={!college}>
              <option value=""> Select specialization</option>
              {(specializations[college] || []).map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Select value={course} onChange={(e) => setCourse(e.target.value)} disabled={!specialization}>
              <option value="">Select course</option>
              {(courses[specialization] || []).map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={12} className="mt-4 text-center">
          <Button
            Button variant="primary" className="btn-purple mt-4 px-4 py-2 "
            style={{width: "200px"}}
            onClick={() => {
              alert(
                `You selected:\n\nUniversity: ${university}\nCollege: ${college}\nSpecialization: ${specialization}\nCourse: ${course}`
              );
            }}
          >
            Search Courses
            </Button>
            </Col>
        </Row>
        
      </Container>
   
    </>
  );
};

export default HomeAfterLoginPage;
