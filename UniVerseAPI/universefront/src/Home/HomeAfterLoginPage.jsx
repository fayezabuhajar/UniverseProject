import {  Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from "axios";
import CustomNavbar from "../Home/CustomNavbar";
import { useNavigate } from 'react-router-dom';



  
const HomeAfterLoginPage = () => {

  
   const [coursesData, setCoursesData] = useState([]);
    const navigate = useNavigate(); // لتفعيل التنقل
  const [university, setUniversity] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const [universities, setUniversities] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Helper to extract unique values
  const getUniqueValues = (array, key) => [...new Set(array.map(item => item[key]))];

  // Fetch all courses
  useEffect(() => {
    axios.get("https://localhost:5001/api/course/filter")
      .then(res => {
        const allCourses = res.data;
        setCoursesData(allCourses);
        setUniversities(getUniqueValues(allCourses, 'university'));
      })
      .catch(err => console.error("Error fetching courses", err));
  }, []);



  // Update specializations when college changes
  useEffect(() => {
    const filtered = coursesData.filter(
      c => c.university.toLowerCase() === university.toLowerCase() 
    );
    setSpecializations(getUniqueValues(filtered, 'specialization'));
    setSpecialization('');
    setSelectedCourseId('');
  }, [university]);

  // Update course list when specialization changes
  useEffect(() => {
    const filtered = coursesData.filter(
      c =>
        c.university.toLowerCase() === university.toLowerCase() &&
        c.specialization.toLowerCase() === specialization.toLowerCase()
    );
    setFilteredCourses(filtered);
    setSelectedCourseId('');
  }, [specialization]);

 




  return (
    <>{/* Navbar */}
    <CustomNavbar />
    

      {/* Main Section */}

    <Container fluid className="home-after-login px-5 py-4">
      {/* Section: Promo Banner */}
      <Row className="align-items-center mb-5 promo-banner rounded shadow-sm p-4">
        <Col md={6}>
          <h2 className="fw-bold mb-3">Your Booked Courses</h2>
          <p className="text-muted mb-3">
    Browse and access all the courses you’ve successfully booked. Continue learning and track your progress easily.
          </p>
         <Button
          variant="primary"
          className="btn-purple"
          onClick={() => navigate("/Courses/MyBookedCourses")}
        >
          View My Courses
        </Button>
        </Col>
        <Col md={6} className="text-end">
          <img src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/6caba229-b963-4af8-84b8-f71693be2507.jpg" alt="Promo" className="img-fluid" style={{ maxHeight: '280px' }} />
        </Col>
      </Row>

      {/* Selection Filters */}
      <Row className="bg-white p-4 rounded shadow-sm">
        <Col md={4}>
          <Form.Select
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          >
            <option value="">Select university</option>
            {universities.map((u, i) => (
              <option key={i} value={u}>{u}</option>
            ))}
          </Form.Select>
        </Col>

        <Col md={4}>
          <Form.Select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            disabled={!university}  
          >
            <option value="">Select specialization</option>
            {specializations.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </Form.Select>
        </Col>

        <Col md={4}>
          <Form.Select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            disabled={!specialization}
          >
            <option value="">Select course</option>
            {filteredCourses.map((c) => (
              <option key={c.id} value={c.id}>
              {c.title}
            </option>

            ))}
          </Form.Select>
        </Col>



        <Col md={12} className="mt-4 text-center">
        <Button
          variant="primary"
          className="btn-purple px-4 py-2"
          style={{ width: "200px" }}
          onClick={() => {
            navigate("/Courses/FiltredCourses", {
              state: {
                university,
                specialization,
                courseId: selectedCourseId,
              }
            });
          }}
          disabled={!selectedCourseId}
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
