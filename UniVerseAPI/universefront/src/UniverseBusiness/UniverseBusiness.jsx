import  { useEffect, useRef, useState } from 'react';
import { Navbar, Container, Form, FormControl, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const videos = [
  { id: 1, src: '/videos/egodef.mp4', title: '' },
  
];

const UniverseBusiness = () => {
const videoRefs = useRef([]);
  const [muted] = useState(false);

  useEffect(() => {
  const currentRefs = [...videoRefs.current]; // capture the current value

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.6 }
  );

  currentRefs.forEach(video => {
    if (video) observer.observe(video);
  });

  return () => {
    currentRefs.forEach(video => {
      if (video) observer.unobserve(video);
    });
  };
}, []);

    
  
    return (
        <><Navbar expand="lg" bg="light" className="shadow-sm px-4 py-3 sticky-top">
        <Container>
          {/* استخدم as={Link} مع to */}
          <Navbar.Brand as={Link} to="/" className="fw-bold text-dark">
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
            <Nav.Link as={Link} to="/" className="text-dark">
              UniVerse Business
            </Nav.Link>
            
            <Nav.Link as={Link} to="/StudentRegister" variant="primary"  style={{
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
    <div className="container py-5">
     

      {/* EGO Group Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">EGO Group</h1>
        <p className="lead">
         <strong>UniVerse</strong> is one of the projects under <strong>EGO Group</strong>
        </p>
      </div>

      {/* About EGO Group */}
      <div className="mb-5">
        <h2 className="h3">🚀 About EGO Group</h2>
        <p>
          EGO Group is a small startup founded by a team of university students who specialize in different disciplines. 
          We collaborate across fields to build meaningful projects in education, entertainment, and technology.
        </p>
      </div>

      <div className="reels-grid">
        {videos.map((video, index) => (
          <div className="reel-card" key={video.id}>
            <video
              src={video.src}
              className="reel-video"
              controls={false}
              loop
              muted={muted}
              ref={el => (videoRefs.current[index] = el)}
            />
            <div className="reel-title">{video.title}</div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div>
        <h2 className="h3 mb-4">📂 Our Projects</h2>

        {/* UniVerse Project */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">🎓 UniVerse</h5>
            <p className="card-text">
              An EdTech platform designed to help students succeed in their university exams. It features short-form videos, motivational content, and clean, user-friendly design. 
              Originally started as a graduation project, UniVerse now aims to grow into a full educational support system.
            </p>
          </div>
        </div>

        {/* KDGO Project */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">👾 KDGO</h5>
            <p className="card-text">
              A fun and simple platform that teaches kids the basics of programming through games and visual exercises. KDGO makes coding enjoyable and easy to grasp for young learners.
            </p>
          </div>
        </div>

        {/* Sajo Project */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">🎮 Sajo</h5>
            <p className="card-text">
              A small, charming game developed for fun and experimentation. Sajo reflects our creative side and love for interactive experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UniverseBusiness;
