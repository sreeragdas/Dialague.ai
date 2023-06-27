import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import useGroupList from "../../hooks/useGroupList";
import { client } from "../../axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppFormLabel from "../../components/Forms/AppFormLabel";
import AppFormControlFeedback from "../../components/Forms/AppFormControlFeedback";
import SuccessMessage from "../../components/Modals/SuccessMessage";
import { EMAIL_REGEX, NAME_REGEX } from "../../utils/common-util";

const initialUser = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  groups: [],
  is_active: true,
  organization: "1",
};

const UserForm = ({ show, close, userData = initialUser }) => {
  const [groupList] = useGroupList(true);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");
  const firstNameRef = useRef(null);
  const formik = useFormik({
    initialValues: userData,
    validationSchema: Yup.object({
      id: Yup.string(),
      is_active: Yup.boolean(),
      first_name: Yup.string()
        .required("First name is required")
        .matches(NAME_REGEX, "First name is not valid"),
      last_name: Yup.string()
        .required("Last name is required")
        .matches(NAME_REGEX, "Last name is not valid"),
      email: Yup.string()
        .email()
        .matches(EMAIL_REGEX, "Email is not valid")
        .required("Email is required"),
      organization: Yup.string().required("Organization is required"),
      groups: Yup.mixed().test(
        "is-role-present",
        "Role is required",
        (value) => {
          return !!value.length && !!value[0];
        }
      ),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validateOnMount: !!initialUser.id.length,
  });

  useEffect(() => {
    firstNameRef?.current?.focus();
  }, [firstNameRef]);

  const handleSubmit = async (values) => {
    setError("");
    setLoading(true);

    try {
      let response = null;
      if (values.id) {
        response = await client.patch(`/update-user/${values.id}/`, values);
      } else {
        response = await client.post(`/create-user/`, values);
      }
      if (response.status === 200 || response.status === 201) {
        formik.resetForm();
        setShowSuccessModal(true);
        return true;
      }
    } catch (error) {
      if (error.response.status == 400) {
        setError("User with this email already exists");
      } else {
        setError(`Unable to ${values.id ? "update" : "create"} user.`);
      }
      console.error(error.response);
    } finally {
      setLoading(false);
    }

    return false;
  };

  return (
    <>
      <Modal
        show={show}
        onHide={close}
        centered
        size="lg"
        className="add-new-contact"
      >
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Button bsPrefix="btn-close" onClick={close}>
              <span aria-hidden="true">X</span>
            </Button>
            <h5 className="mb-5">
              {formik.values.id ? "Update" : "Create"} User Form
            </h5>
            <Row className="gx-3">
              <Col sm={6}>
                <Form.Group className="mb-3">
                  <AppFormLabel
                    htmlFor="first-name"
                    label="First Name"
                    required={true}
                  />
                  <Form.Control
                    ref={firstNameRef}
                    tabIndex={1}
                    id="first-name"
                    name="first_name"
                    placeholder="Enter first name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.first_name}
                    isInvalid={formik.errors.first_name}
                    isValid={
                      formik.values.first_name &&
                      NAME_REGEX.test(formik.values.first_name)
                    }
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-3">
                  <AppFormLabel
                    htmlFor="last-name"
                    label="Last Name"
                    required={true}
                  />
                  <Form.Control
                    tabIndex={2}
                    id="last-name"
                    name="last_name"
                    placeholder="Enter last name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.last_name}
                    isInvalid={formik.errors.last_name}
                    isValid={
                      formik.values.last_name &&
                      NAME_REGEX.test(formik.values.last_name)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="gx-3">
              <Col sm={6}>
                <Form.Group className="mb-3">
                  <AppFormLabel htmlFor="email" label="Email" required={true} />
                  <Form.Control
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    autoComplete="new-email"
                    tabIndex={3}
                    isValid={
                      formik.values.email &&
                      EMAIL_REGEX.test(formik.values.email)
                    }
                    isInvalid={formik.errors.email}
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-3">
                  <AppFormLabel htmlFor="role" label="Role" required={true} />
                  <select
                    className={`form-select 
                    ${formik.errors.groups ? "is-invalid" : ""} 
                    ${
                      formik.values.groups.length &&
                      formik.values.groups[0].length
                        ? "is-valid"
                        : ""
                    }`}
                    tabIndex={4}
                    id="role"
                    name="role"
                    onChange={(e) => {
                      formik.values.groups[0] = Number(e.target.value);
                      formik.validateField("groups");
                    }}
                    value={
                      formik.values.groups?.length && formik.values.groups[0]
                    }
                  >
                    {groupList.map((option) => (
                      <option value={option?.id} key={option?.id}>
                        {option?.name}
                      </option>
                    ))}
                  </select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="gx-3">
              <Col sm={6} className="mb-3">
                <Form.Group className="mb-3">
                  <AppFormLabel
                    htmlFor="is-active"
                    label="Is Active"
                    required={false}
                  />
                  <Form.Check
                    type="switch"
                    label={`${formik.values.is_active ? "Active" : "Inactive"}`}
                    tabIndex={5}
                    id="is-active"
                    name="is_active"
                    onChange={formik.handleChange}
                    value={formik.values.is_active === true}
                    checked={formik.values.is_active === true}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-danger my-2">
                  {formik.errors && (
                    <AppFormControlFeedback
                      formikErrors={formik.errors}
                      formError={error}
                    />
                  )}
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </Form>
        <Modal.Footer className="align-items-center">
          <Button
            type="submit"
            variant="primary"
            disabled={!formik.isValid}
            tabIndex={5}
            onClick={formik.handleSubmit}
          >
            {!loading && (
              <span>{formik.values.id ? "Update" : "Create"} User</span>
            )}
            {loading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      {showSuccessModal && (
        <SuccessMessage
          message={`User ${
            formik.values.id ? "updated" : "created"
          } successfully.`}
        />
      )}
    </>
  );
};

export default UserForm;
