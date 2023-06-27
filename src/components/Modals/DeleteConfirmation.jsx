import { useEffect } from "react";
import Swal from "sweetalert2";

const DeleteConfirmation = ({
  onConfirm,
  onCancel,
  warningMessage,
  successMessage,
}) => {
  useEffect(() => {
    Swal.fire({
      title: "Are you sure?",
      text: warningMessage,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await onConfirm();
          if (response.status === 200 || response.status === 204) {
            Swal.fire("Deleted!", successMessage, "success").then(() => {
              window.location.reload();
            });
          } else {
            console.log("delete response", response);
          }
        } catch (error) {
          console.error(error);
          const errorMessage =
            error?.response?.data?.detail || "Unable to delete!";
          Swal.fire("Failed!", errorMessage, "error").then(() => {
            onCancel();
          });
        }
      } else {
        onCancel();
      }
    });
  }, []);

  return null;
};

export default DeleteConfirmation;
