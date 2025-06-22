import Swal from "sweetalert2";
import { useEffect } from "react";

const PaymentCancel = () => {
  useEffect(() => {
    Swal.fire({
      icon: "info",
      title: "Payment Cancelled",
      text: "You have cancelled the payment. No booking was made.",
    });
  }, []);

  return <div className="text-center mt-5">Payment was cancelled.</div>;
};

export default PaymentCancel;
