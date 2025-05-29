import  { useEffect, useRef, useState } from 'react';
import { Navbar, Container, Form, FormControl, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Reels.css';

const videos = [
  { id: 1, src: '/videos/reel1.mp4', title: '' },
  { id: 2, src: '/videos/reel2.mp4', title: '' },
  { id: 3, src: '/videos/reel3.mp4', title: '' },
];

const Reels = () => {
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
    <>
      <Navbar expand="lg" bg="light" className="shadow-sm px-4 py-3 sticky-top">
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
    <div className="reels-wrapper">
      <header className="reels-header">
        <h1> UniVerse Reels</h1>
        
      </header>

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
    </div>
    </>
  );
};

export default Reels;
