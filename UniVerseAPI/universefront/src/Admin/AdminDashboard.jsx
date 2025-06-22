import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';


const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const token = JSON.parse(localStorage.getItem("adminToken"))?.token;


  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

const fetchAllData = async () => {
  try {
    // Fetch approved courses
    const approvedRes = await axios.get("https://localhost:5001/api/course/approved", config);
    setCourses(approvedRes.data);
    console.log("Approved courses fetched successfully");

    // Fetch pending courses
    const pendingRes = await axios.get("https://localhost:5001/api/course/pending", config);
    setPendingCourses(pendingRes.data);
    console.log("Pending courses fetched successfully");

    // Fetch students
    const studentsRes = await axios.get("https://localhost:5001/api/student", config);
    setStudents(studentsRes.data);
    console.log("Students fetched successfully");

    // Fetch instructors
    const instructorsRes = await axios.get("https://localhost:5001/api/instructor", config);
    setInstructors(instructorsRes.data);
    console.log("Instructors fetched successfully");

  } catch (err) {
    console.error("Error fetching data:");
    if (err.response) {
      console.error("Failed URL:", err.config.url);
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    } else if (err.request) {
      console.error("No response received for:", err.config?.url);
    } else {
      console.error("Error Message:", err.message);
    }
  }
};




  useEffect(() => {
    fetchAllData();
  }, []);



  const deleteCourse = async (id) => {
    try {
      await axios.delete(`https://localhost:5001/api/course/${id}`, config);
      fetchAllData();
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  const blockInstructor = async (instructorId) => {

  try {
    await axios.put(
      `https://localhost:5001/api/instructor/block/${instructorId}`,
      {}, // body فارغة
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Instructor blocked successfully");
    fetchAllData();
    // هنا ممكن تعيد جلب البيانات لتحديث الواجهة
  } catch (error) {
    console.error("Error blocking instructor:", error);
    alert("Failed to block instructor");
  }
};

const blockStudent = async (studentId) => {

  try {
    await axios.put(
      `https://localhost:5001/api/student/block/${studentId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Student blocked successfully");
    fetchAllData();
  } catch (error) {
    console.error("Error blocking student:", error);
    alert("Failed to block student");
  }
};

const unblockStudent = async (id) => {
  try {
    await axios.put(`https://localhost:5001/api/student/unblock/${id}`, {}, config);
    alert("Student unblocked successfully");
    fetchAllData();
  } catch (err) {
    console.error("Error unblocking student:", err);
  }
};

  const handleShowDetails = async  (course) => {
    
      setSelectedCourse(course);
      const email = await fetchInstructorEmailFromId(course.instructorId);
    setSelectedCourse((prev) => ({ ...prev, instructorEmail: email }));
    const modal = new bootstrap.Modal(document.getElementById('detailsModal'));
    modal.show();
  };

const unblockInstructor = async (id) => {
  try {
    await axios.put(`https://localhost:5001/api/instructor/unblock/${id}`, {}, config);
    alert("Instructor unblocked successfully");
    fetchAllData();
  } catch (err) {
    console.error("Error unblocking instructor:", err);
  }
};

    const handleApprove = async (courseId) => {
  try {
    await axios.post(
      `https://localhost:5001/api/course/approve/${courseId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert('Course approved successfully');
    fetchAllData(); // Refresh data after status change
  } catch (error) {
    console.error('Error approving course:', error);
    alert('Failed to approve course');
  }
};

const handleReject = async (courseId) => {
  try {
    await axios.post(
      `https://localhost:5001/api/course/reject/${courseId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert('Course rejected successfully');
    fetchAllData(); // Refresh data after status change
  } catch (error) {
    console.error('Error rejecting course:', error);
    alert('Failed to reject course');
  }
};

const fetchInstructorEmailFromId = async (instructorId) => {
  try {
    const response = await axios.get(
      `https://localhost:5001/api/instructor/${instructorId}`,
      config // assuming you want to pass auth headers
    );
    return response.data.email; // Adjust based on your actual response structure
  } catch (error) {
    console.error('Error fetching instructor email:', error);
    return 'N/A';
  }
};



  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">Admin Dashboard</h2>

      <div className="row mb-5">
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h5 className="card-title">Approved Courses</h5>
              <p className="display-6 text-success">{courses.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h5 className="card-title">Pending Courses</h5>
              <p className="display-6 text-warning">{pendingCourses.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h5 className="card-title">Students</h5>
              <p className="display-6 text-primary">{students.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h5 className="card-title">Instructors</h5>
              <p className="display-6 text-dark">{instructors.length}</p>
            </div>
          </div>
        </div>
      </div>

       <div className="row mb-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-success text-white">Approved Courses</div>
            <ul className="list-group list-group-flush">
              {courses.map((c) => (
                <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{c.title}</span>
                  <div>
                    <button className="btn btn-sm btn-outline-danger me-2" onClick={() => deleteCourse(c.id)}>Delete</button>
                    <button className="btn btn-sm btn-info" onClick={() => handleShowDetails(c)}>Details</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-warning text-dark">Pending Courses</div>
            <ul className="list-group list-group-flush">
              {pendingCourses.map((c) => (
                <li key={c.id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-semibold">{c.title}</span>
                    <div>
                      <button className="btn btn-sm btn-success me-2" onClick={() => handleApprove(c.id)}>Approve</button>
                      <button className="btn btn-sm btn-danger me-2" onClick={() => handleReject(c.id)}>Reject</button>
                      <button className="btn btn-sm btn-info" onClick={() => handleShowDetails(c)}>Details</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-primary text-white">Students</div>
            <ul className="list-group list-group-flush">
              {students.map((s) => (
                <li key={s.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {s.email}
                  {s.isBlocked ? (
                    <button className="btn btn-sm btn-success" onClick={() => unblockStudent(s.id)}>Unblock</button>
                  ) : (
                    <button className="btn btn-sm btn-danger" onClick={() => blockStudent(s.id)}>Block</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-dark text-white">Instructors</div>
            <ul className="list-group list-group-flush">
              {instructors.map((i) => (
                <li key={i.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {i.email}
                  {i.isBlocked ? (
                    <button className="btn btn-sm btn-success" onClick={() => unblockInstructor(i.id)}>Unblock</button>
                  ) : (
                    <button className="btn btn-sm btn-danger" onClick={() => blockInstructor(i.id)}>Block</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="modal fade" id="detailsModal" tabIndex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow">
            <div className="modal-header">
              <h5 className="modal-title" id="detailsModalLabel">{selectedCourse?.title}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p><strong>Description:</strong> {selectedCourse?.description}</p>
              <p><strong>Instructor:</strong> {selectedCourse?.instructorEmail}</p>
              <p><strong>Status:</strong> {selectedCourse?.status === 0 ? 'Pending' : 'Approved'}</p>
              <p><strong>Duration:</strong> {selectedCourse?.duration} hours</p>
              <p><strong>Price:</strong> {selectedCourse?.price} JD</p>
              <p><strong>Image:</strong> {selectedCourse?.pictureUrl}</p>
              <p><strong>Video:</strong> {selectedCourse?.videoPreviewUrl}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default AdminDashboard;
