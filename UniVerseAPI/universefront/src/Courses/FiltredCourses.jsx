import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CourseCardGrid from "./CourseCardGrid"; 
import CustomNavbar from "../Home/CustomNavbar";


const FilteredCourses = () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const location = useLocation();
  const { university, specialization, courseId } = location.state || {};

  const [matchingCourses, setMatchingCourses] = useState([]);
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/course/approved');
        const allCourses = response.data;

        // الحصول على اسم الكورس من courseId
        const selectedCourse = allCourses.find(c => c.id === parseInt(courseId));
        if (!selectedCourse) return;

        setCourseName(selectedCourse.title);

        // فلترة الكورسات حسب الاسم، التخصص والجامعة
        const filtered = allCourses.filter(course =>
          course.university === university &&
          course.specialization === specialization &&
          course.title === selectedCourse.title
        );

        // جلب اسم المدرس لكل كورس مفلتر
        const enrichedCourses = await Promise.all(
          filtered.map(async (course) => {
            const instructorName = await fetchInstructorNameFromId(course.instructorId);
            return { ...course, instructorName };
          })
        );

        setMatchingCourses(enrichedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    if (university && specialization && courseId) {
      fetchCourses();
    }
  }, [university, specialization, courseId]);

  const fetchInstructorNameFromId = async (instructorId) => {
    try {
      const response = await axios.get(
        `https://localhost:5001/api/instructor/${instructorId}`,
        config
      );
      return response.data.firstName + " " + response.data.lastName;
    } catch (error) {
      console.error('Error fetching instructor name:', error);
      return "N/A";
    }
  };

  return (
    <>
      <CustomNavbar />
      <div className="container py-4">
        <h3 className="mb-4 text-center">
          Results for: {courseName} ({specialization} - {university})
        </h3>

        {matchingCourses.length > 0 ? (
          <CourseCardGrid courses={matchingCourses} />
        ) : (
          <p className="text-center">No matching courses found.</p>
        )}
      </div>
    </>
  );
};

export default FilteredCourses;
