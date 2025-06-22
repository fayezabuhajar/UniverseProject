import  { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Table, Form, Spinner, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav} from 'react-bootstrap';
  import { useNavigate } from "react-router-dom";

import { FiLogOut } from "react-icons/fi"; // أيقونة تسجيل الخروج

function InstructorAvailableSlots() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("date");
  const [sortDesc, setSortDesc] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [courses, setCourses] = useState([]);


  axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

const [addFormData, setAddFormData] = useState({
  courseId: "",
  date: "",
  startTime: "",
  endTime: "",
  isBooked: false,
});




function handleAddChange(e) {
  const { name, value, type, checked } = e.target;
  setAddFormData(prev => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
}


async function saveNewSlot() {
  try {
    const payload = {
      courseId: Number(addFormData.courseId),
      date: addFormData.date,
      startTime: addFormData.startTime + ":00",  // تأكد من إضافة الثواني إذا يحتاجها السيرفر
      endTime: addFormData.endTime + ":00",
      isBooked: addFormData.isBooked,
    };

    await axios.post("https://localhost:5001/api/instructor/availableSlots", payload);
    setShowAddModal(false);
    fetchSlots(); // أو تحديث البيانات بعد الإضافة
  } catch (err) {
    console.error("Add slot error:", err.response || err);
    alert("Failed to add new slot: " + (err.response?.data || err.message));
  }
}


  const [editFormData, setEditFormData] = useState({
    courseId: "",
    date: "",
    startTime: "",
    endTime: "",
    isBooked: false,
  });

  function getInstructorIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = token.split('.')[1];
  if (!payload) return null;

  try {
    const decoded = JSON.parse(atob(payload));
    return decoded.Id || decoded.id || null;
  } catch (err) {
    console.error("Failed to decode token", err);
    return null;
  }
}



  useEffect(() => {
  async function fetchCourses() {
    const instructorId = getInstructorIdFromToken();
    if (!instructorId) {
      console.error("InstructorId is missing in the token.");
      return;
    }

    try {
      const res = await axios.get(`https://localhost:5001/api/course/instructor/${instructorId}`);
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to load courses", err);
    }
  }

  fetchCourses();
}, []);

async function fetchSlots() {
  setLoading(true);
  setError(null);
  try {
    const params = {
      pageNumber: page,
      pageSize: 10,
      sortBy,
      sortDesc,
      searchTerm,
      date: filterDate || undefined,
    };
    const response = await axios.get("https://localhost:5001/api/instructor/availableSlots", { params });
    setSlots(response.data.items || response.data);
    setTotalPages(Math.ceil((response.data.totalCount || response.data.length) / 10));
  } catch (err) {
    setError("Failed to load data.");
  }
  setLoading(false);
}


useEffect(() => {
  fetchSlots();
}, [page, sortBy, sortDesc, searchTerm, filterDate]);



  function handleSort(column) {
    if (sortBy === column) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(column);
      setSortDesc(false);
    }
    setPage(1);
  }

  function openDetailModal(slot) {
    setSelectedSlot(slot);
    setShowDetailModal(true);
  }

  function openEditModal(slot) {
    setEditFormData({
      courseId: slot.courseId,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      isBooked: slot.isBooked,
    });
    setSelectedSlot(slot);
    setShowEditModal(true);
  }

  async function saveEdit() {
    try {
      await axios.put(`https://localhost:5001/api/instructor/availableSlots/${selectedSlot.id}`, {
        courseId: editFormData.courseId,
        date: editFormData.date,
        startTime: editFormData.startTime,
        endTime: editFormData.endTime,
        isBooked: editFormData.isBooked,
      });
      setShowEditModal(false);
      setPage(1); // Reload page
    } catch (err) {
      alert("Failed to save changes.");
    }
  }

  function handleEditChange(e) {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

 async function goToMeeting(slot) {
  try {
   const { data: fullSlot } = await axios.get(`https://localhost:5001/api/instructor/availableSlots/${slot.id}`);

    if (!fullSlot.bookings || fullSlot.bookings.length === 0) {
      alert("No booking found for this slot.");
      return;
    }

const bookingId = fullSlot.bookings[0].id;

    const linkRes = await axios.get(`https://localhost:5001/api/bookings/${bookingId}/meeting-link`);
    const meetingLink = linkRes.data.meetingLink;

    if (meetingLink) {
      window.open(meetingLink, "_blank");
    } else {
      alert("Meeting link not found.");
    }
  } catch (err) {
    alert("Failed to retrieve meeting link.");
    console.error(err);
  }
}



  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };



  return (
    <>
     <Navbar expand="lg" bg="light" className="shadow-sm px-4 py-3 sticky-top">
        <Navbar.Brand href="#" className="fw-bold text-dark">UniVerse</Navbar.Brand>
        <Form className="d-flex mx-4 flex-grow-1">
          
        </Form>
        <Nav>
          

          <Nav.Link href="/login" className="text-dark">Switch to Student</Nav.Link>  
          
      
         {/* أيقونة تسجيل الخروج */}
        <Nav.Link onClick={handleLogout} className="text-danger" title="Logout">
          <FiLogOut size={22} />
        </Nav.Link>
        </Nav>
      </Navbar>
    <div className="container mt-4">
      <h2>Instructor Available Slots</h2>

      <Form className="mb-3 d-flex gap-2">
        <Form.Control
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />
        <Form.Control
          type="date"
          value={filterDate}
          onChange={(e) => {
            setFilterDate(e.target.value);
            setPage(1);
          }}
        />
      </Form>

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>

        <Button variant="success" className="mb-3" onClick={() => setShowAddModal(true)}>
          Add New Slot
        </Button>

        <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="md" centered>
  <Modal.Header closeButton>
    <Modal.Title>Add New Available Slot</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
      <Form.Label>Course</Form.Label>
      <Form.Select
        name="courseId"
        value={addFormData.courseId}
        onChange={handleAddChange}
      >
        <option value="">Select a course</option>
        {courses.map(course => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </Form.Select>
    </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={addFormData.date}
          onChange={handleAddChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Start Time</Form.Label>
        <Form.Control
          type="time"
          name="startTime"
          value={addFormData.startTime}
          onChange={handleAddChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>End Time</Form.Label>
        <Form.Control
          type="time"
          name="endTime"
          value={addFormData.endTime}
          onChange={handleAddChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Booked"
          name="isBooked"
          checked={addFormData.isBooked}
          onChange={handleAddChange}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={saveNewSlot}>
      Add
    </Button>
  </Modal.Footer>
</Modal>


          <Table striped bordered hover>
  <thead>
    <tr>
      <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
        Date {sortBy === "date" ? (sortDesc ? "▼" : "▲") : ""}
      </th>
      <th onClick={() => handleSort("startTime")} style={{ cursor: "pointer" }}>
        Start Time {sortBy === "startTime" ? (sortDesc ? "▼" : "▲") : ""}
      </th>
      <th onClick={() => handleSort("endTime")} style={{ cursor: "pointer" }}>
        End Time {sortBy === "endTime" ? (sortDesc ? "▼" : "▲") : ""}
      </th>
      <th>Course</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {slots.length === 0 ? (
      <tr>
        <td colSpan={6} className="text-center">
          No data found
        </td>
      </tr>
    ) : (
      slots.map((slot) => (
        <tr key={slot.id}>
          <td>{slot.date}</td>
          <td>{slot.startTime}</td>
          <td>{slot.endTime}</td>
          <td>{(courses.find(c => c.id === slot.courseId)?.title) || "N/A"}</td>
          <td>{slot.isBooked ? "Booked" : "Available"}</td>
          <td>
            <Button
              size="sm"
              variant="info"
              className="me-2"
              onClick={() => openDetailModal(slot)}
            >
              Details
            </Button>
            <Button size="sm" variant="warning" onClick={() => openEditModal(slot)}>
              Edit
            </Button>
            <Button
              size="sm"
              variant="primary"
              className="ms-2"
              onClick={() => goToMeeting(slot)}
              disabled={!slot.isBooked}
              title={slot.isBooked ? "Go to Meeting" : "Slot not booked"}
            >
              Go to Meeting
            </Button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</Table>

          <div className="d-flex justify-content-center gap-2">
            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </Button>
            <span>
              Page {page} of {totalPages}
            </span>
            <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
              Next
            </Button>
          </div>
        </>
      )}

      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Available Slot Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSlot && (
            <>
              <p><strong>Date:</strong> {selectedSlot.date}</p>
              <p><strong>Start Time:</strong> {selectedSlot.startTime}</p>
              <p><strong>End Time:</strong> {selectedSlot.endTime}</p>
              <p><strong>Course:</strong> {selectedSlot.course?.title || "N/A"}</p>
              <p><strong>Status:</strong> {selectedSlot.isBooked ? "Booked" : "Available"}</p>
              <hr />
              <h5>Related Bookings</h5>
              {selectedSlot.bookings?.length > 0 ? (
                <ul>
                  {selectedSlot.bookings.map((b) => (
                    <li key={b.id}>
                      {b.studentName} - {new Date(b.bookingTime).toLocaleString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No bookings found.</p>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Available Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Course ID</Form.Label>
              <Form.Control
                type="number"
                name="courseId"
                value={editFormData.courseId}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={editFormData.date}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={editFormData.startTime}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                name="endTime"
                value={editFormData.endTime}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Booked"
                name="isBooked"
                checked={editFormData.isBooked}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
}

export default InstructorAvailableSlots;
