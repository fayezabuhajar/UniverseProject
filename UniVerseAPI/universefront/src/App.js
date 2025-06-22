import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './Home/Home';
import HomeAfterLoginPage from './Home/HomeAfterLoginPage';
import LoginPage from './Login/LoginPage';
import TeachWithUsPage from './Register/TeachWithUsPage';
import StudentRegister from './Register/StudentRegister';
import InstructorLogin from './Login/InstructorLogin';
import InstructorCourses from './InstructorDashboard/InstructorCourses';
import Comments from './Communication/Comments';
import Messages from './Communication/Messages';
import Assignments from './Communication/Assignments';
import Quizzes from './Communication/Quizzes';
import Reels from './Reels/Reels';
import UniverseBusiness from './UniverseBusiness/UniverseBusiness';
import AdminLoginPage from './Admin/AdminLoginPage';
import AdminDashboard from './Admin/AdminDashboard';
import FiltredCourses from './Courses/FiltredCourses';
import InstructorAvailableSlots from './InstructorDashboard/InstructorAvailableSlots';
import PaymentSuccess from "./Payment/PaymentSuccess";
import PaymentCancel from "./Payment/PaymentCancel";
import MyBookedCourses from "./Courses/MyBookedCourses";
import CustomNavbar from "./Home/CustomNavbar";

import './App.css';  // CSS import يجب أن يبقى آخر شيء أو في البداية حسب التنظيم

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/StudentRegister" element={<StudentRegister />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/HomeAfterLoginPage" element={<HomeAfterLoginPage />} />
        <Route path="/TeachWithUsPage" element={<TeachWithUsPage />} />
        <Route path="/InstructorLogin" element={<InstructorLogin />} />
        <Route path="/InstructorCourses" element={<InstructorCourses />} />
        <Route path="/Comments" element={<Comments />} />
        <Route path="/Messages" element={<Messages />} />
        <Route path="/Assignments" element={<Assignments />} />
        <Route path="/Quizzes" element={<Quizzes />} />
        <Route path="/Reels" element={<Reels />} />
        <Route path="/UniverseBusiness" element={<UniverseBusiness />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/Courses/FiltredCourses" element={<FiltredCourses />} />
        <Route path="/InstructorDashboard/InstructorAvailableSlots" element={<InstructorAvailableSlots />} />
        <Route path="/Payment/payment-success" element={<PaymentSuccess />} />
        <Route path="/Payment/PaymentCancel" element={<PaymentCancel />} />
        <Route path="/Courses/MyBookedCourses" element={<MyBookedCourses />} />
        <Route path="/Home/CustomNavbar" element={<CustomNavbar />} />
      </Routes>
    </Router>
  );
};

export default App;
