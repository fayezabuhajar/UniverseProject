import { useState } from "react";
import { Card, Button, Row, Col, Badge, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

// Stripe public key (test mode)
const stripePromise = loadStripe("pk_test_51RblPzQLBNtG1fLLAFLed8uDpRWPZsbLjngYPRaN6TVRDkITWB0nmowBH3x5Acc721bUVQXITalSU6kI8V55cge800ntPh3Jet");

const CourseCardGrid = ({ courses }) => {
  const token = localStorage.getItem("token");

  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  const handleBuyClick = async (course) => {
    setSelectedCourse(course);
    setSelectedSlotId(null);

    try {
      const response = await axios.get(
        `https://localhost:5001/api/instructor/availableSlots/public/${course.id}`
      );
      setSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
      setSlots([]);
    }

    setShowCheckout(true);
  };

 const [isProcessing, setIsProcessing] = useState(false);

const handleStripeRedirect = async () => {
  if (!selectedCourse || !selectedSlotId || isProcessing) return;

  setIsProcessing(true);
  
  try {
    const stripe = await stripePromise;

    const response = await axios.post(
      "https://localhost:5001/api/payments/create-checkout-session",
      {
        amount: Math.round(selectedCourse.price * 100),
        productName: selectedCourse.title,
        courseId: selectedCourse.id,
        slotId: selectedSlotId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const sessionId = response.data.sessionId;

    await stripe.redirectToCheckout({ sessionId });
  } catch (err) {
    console.error("Payment error:", err);
    if (err.response && err.response.data) {
      alert(err.response.data); // عرض رسالة الخطأ من API (مثلاً حجز مكرر)
    } else {
      alert("Payment failed. Please try again.");
    }
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <>
      <Row className="g-4">
        {courses.map((course) => (
          <Col key={course.id} md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={course.pictureUrl}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {course.instructorName}
                </Card.Subtitle>
                <Card.Text style={{ fontSize: "0.9rem", minHeight: "60px" }}>
                  {course.description.length > 100
                    ? course.description.slice(0, 100) + "..."
                    : course.description}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Badge bg="success">{course.rating ?? "4.5"} ★</Badge>
                  <span className="fw-bold text-primary">{course.duration} hours</span>
                  <span className="fw-bold text-primary">${course.price}</span>
                </div>
              </Card.Body>
              <Card.Footer className="bg-white border-top-0">
                <Button
                  variant="outline-primary"
                  className="w-100"
                  onClick={() => handleBuyClick(course)}
                >
                  Buy Now
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* مودال اختيار الوقت */}
      <Modal
        show={showCheckout}
        onHide={() => setShowCheckout(false)}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Book Your Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {slots.length === 0 ? (
            <p>No available slots for this course.</p>
          ) : (
            <>
              <Form.Select
                value={selectedSlotId || ""}
                onChange={(e) => setSelectedSlotId(parseInt(e.target.value))}
                className="mb-4"
              >
                <option value="">Select a time slot</option>
                {slots.map((slot) => (
                  <option key={slot.id} value={slot.id}>
                    {slot.date} | {slot.startTime} - {slot.endTime}
                  </option>
                ))}
              </Form.Select>

              <Button
                variant="primary"
                className="w-100"
                onClick={handleStripeRedirect}
                disabled={!selectedSlotId || isProcessing}
                >
                {isProcessing ? "Processing..." : "Continue to Payment"}
                </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CourseCardGrid;
