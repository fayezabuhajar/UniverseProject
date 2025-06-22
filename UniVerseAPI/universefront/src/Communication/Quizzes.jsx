import React, { useState } from 'react';
import {
  FaBook, FaComments, FaChartBar, FaTools, FaQuestionCircle,
  FaChevronDown, FaEnvelope, FaTasks, FaClipboardList
} from 'react-icons/fa';

const Quizzes = () => {
  const [showSubMenu, setShowSubMenu] = useState(true); // مفتوح افتراضياً

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white vh-100 p-3" style={{ width: '240px' }}>
        <h4 className="text-white mb-4">UniVerse</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a href="/InstructorCourses" className="nav-link text-white">
              <FaBook className="me-2" /> Courses
            </a>
          </li>

          <li className="nav-item mb-2">
            <span
              className="nav-link text-white d-flex justify-content-between align-items-center"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowSubMenu(!showSubMenu)}
            >
              <span>
                <FaComments className="me-2" /> Communication
              </span>
              <FaChevronDown />
            </span>

            {showSubMenu && (
              <ul className="nav flex-column ms-3 mt-2">
                <li className="nav-item mb-1">
                  <a href="/Comments" className="nav-link text-white">
                    <FaQuestionCircle className="me-2" /> Comments
                  </a>
                </li>
                <li className="nav-item mb-1">
                  <a href="/Messages" className="nav-link text-white">
                    <FaEnvelope className="me-2" /> Messages
                  </a>
                </li>
                <li className="nav-item mb-1">
                  <a href="assignments" className="nav-link text-white">
                    <FaTasks className="me-2" /> Assignments
                  </a>
                </li>
                <li className="nav-item mb-1">
                  <a href="/quizzes" className="nav-link text-white">
                    <FaClipboardList className="me-2" /> Quizzes
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li className="nav-item mb-2">
            <a href="/performance" className="nav-link text-white">
              <FaChartBar className="me-2" /> Performance
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="/tools" className="nav-link text-white">
              <FaTools className="me-2" /> Tools
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="/resources" className="nav-link text-white">
              <FaQuestionCircle className="me-2" /> Resources
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center bg-light vh-100">
        <div className="text-center">
          <FaClipboardList size={100} className="text-secondary mb-4" />
          <h4 className="fw-bold">No results</h4>
          <p className="text-muted px-4" style={{ maxWidth: '500px', margin: 'auto' }}>
          Quizzes are where you can create and manage assessments for your students. Here’s where you’ll see them.</p>
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
