import { useEffect } from "react";
import Swal from "sweetalert2";

const SuccessMessage = ({ message }) => {
  useEffect(() => {
    Swal.fire({
      html: `<div className="d-flex align-items-center">
                <i className="ri-calendar-check-line me-2 fs-4 text-success"></i>
                <h4 className="mb-0">${message}</h4>
            </div>`,
      customClass: {
        content: "p-0",
        actions: "justify-content-start",
      },
      willClose: () => {
        window.location.reload();
      },
      width: 400,
      showConfirmButton: false,
      buttonsStyling: false,
    });
  }, []);

  return null;
};

export default SuccessMessage;
