import { Navbar, Form, FormControl, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // أيقونة تسجيل الخروج

const CustomNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
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
        <Nav.Link href="/Reels" className="text-dark">Reels</Nav.Link>
        <Nav.Link href="/UniverseBusiness" className="text-dark">UniVerse Business</Nav.Link>
        <Nav.Link href="/TeachWithUsPage" className="text-dark"> Switch to Instructor</Nav.Link>
        
        {/* أيقونة تسجيل الخروج */}
        <Nav.Link onClick={handleLogout} className="text-danger" title="Logout">
          <FiLogOut size={22} />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
