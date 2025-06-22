import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSearchParams } from "react-router-dom";
import CustomNavbar from "../Home/CustomNavbar";


const PaymentSuccess = () => {
  const [meetingLink, setMeetingLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const courseId = searchParams.get("courseId");
    const slotId = searchParams.get("slotId");

    if (courseId && slotId) {
      axios
        .post(
          "https://localhost:5001/api/Bookings",
          {
            courseId: parseInt(courseId),
            slotId: parseInt(slotId),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const link = res.data.meetingLink;
          setMeetingLink(link);
          Swal.fire({
            icon: "success",
            title: "Payment & Booking Successful",
            text: "Your session has been booked.",
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Booking Failed",
            text: error.response?.data || "Something went wrong.",
          });
        })
        .finally(() => setLoading(false));
    }
  }, [searchParams, token]);

  return (
    <>
    <CustomNavbar  />
    <div className="container mt-5 text-center">
      <h2 className="mb-4">🎉 Payment Successful!</h2>
      {loading ? (
        <p>Generating your meeting link...</p>
      ) : meetingLink ? (
        <>
          <p>Your session is booked successfully.</p>
          <a
            href={meetingLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-success"
          >
            Join Meeting
          </a>
        </>
      ) : (
        <p>Something went wrong. No meeting link was generated.</p>
      )}
    </div>
    </>
  );
};

export default PaymentSuccess;
