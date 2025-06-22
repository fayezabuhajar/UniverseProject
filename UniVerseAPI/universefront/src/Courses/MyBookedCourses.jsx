import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import CustomNavbar from "../Home/CustomNavbar";


const MyBookedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://localhost:5001/api/bookings/my-bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (err) {
        console.error("Failed to load courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <><CustomNavbar />
    <div className="container mt-5">
      <h2 className="fw-bold mb-4 text-center">My Booked Courses</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {courses.map((course, index) => (
          <Col key={index}>
            <Card className="h-100 shadow-sm border-0 rounded-4">
              <Card.Img
                variant="top"
                src={course.imageUrl || "https://via.placeholder.com/400x200?text=Course+Image"}
                style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-semibold text-truncate">{course.title}</Card.Title>
                <Card.Text className="text-muted small flex-grow-1">
                  {course.description?.slice(0, 100) || "No description available."}
                </Card.Text>
                <div className="mt-2 text-muted small">
                <strong>Session Date:</strong> {course.date} <br />
                <strong>Start Time:</strong> {course.startTime}
                </div>     
              </Card.Body>
              <Card.Footer className="bg-white border-0">
                <a
                    href={course.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-primary w-100"
                >
                    Start Course
                </a>
                </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    </>
  );
};

export default MyBookedCourses;
