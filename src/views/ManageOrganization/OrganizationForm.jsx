import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { client } from "../../axios";
import SuccessMessage from "../../components/Modals/SuccessMessage";
import AppFormControlFeedback from "../../components/Forms/AppFormControlFeedback";
import AppFormLabel from "../../components/Forms/AppFormLabel";
import { NAME_WITH_SPACE_REGEX } from "../../utils/common-util";

const initialOrg = {
  id: "",
  company_name: "",
  description: "",
};

const OrganizationForm = ({ show, close, organizationData = initialOrg }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const companyNameRef = useRef(null);
  const formik = useFormik({
    initialValues: organizationData,
    validationSchema: Yup.object({
      id: Yup.string(),
      company_name: Yup.string()
        .required("Company name is required")
        .matches(NAME_WITH_SPACE_REGEX, "Company name is not valid"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    companyNameRef?.current?.focus();
  }, [companyNameRef]);

  const handleSubmit = async (values) => {
    setError("");
    setLoading(true);

    try {
      let response = null;
      if (values.id) {
        response = await client.patch(`/organization/${values.id}/`, values);
      } else {
        response = await client.post(`/organization/`, values);
      }

      if (response.status === 200 || response.status === 201) {
        formik.resetForm();
        setShowSuccessModal(true);
        return true;
      }
    } catch (error) {
      setError(`Unable to ${values.id ? "update" : "create"} Organization.`);
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
              {formik.values.id ? "Update" : "Create"} Organization
            </h5>
            <Row className="gx-3">
              <Col sm={12}>
                <Form.Group className="mb-3">
                  <AppFormLabel
                    htmlFor="company_name"
                    label="Company Name"
                    required={true}
                  />
                  <Form.Control
                    ref={companyNameRef}
                    tabIndex={1}
                    id="company_name"
                    name="company_name"
                    placeholder="Enter name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.company_name}
                    isInvalid={formik.errors.company_name}
                    isValid={
                      formik.values.company_name &&
                      NAME_WITH_SPACE_REGEX.test(formik.values.company_name)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="gx-3">
              <Col sm={12} as={Form.Group}>
                <Form.Group className="mb-3">
                  <AppFormLabel
                    htmlFor="description"
                    label="Description"
                    required={true}
                  />
                  <Form.Control
                    as="textarea"
                    className="mnh-100p form-control"
                    rows={4}
                    tabIndex={3}
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    isInvalid={formik.errors.description}
                    isValid={
                      formik.values.description && formik.values.description
                    }
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
            tabIndex={4}
            onClick={formik.handleSubmit}
          >
            {!loading && (
              <span>{formik.values.id ? "Update" : "Create"} Oranization</span>
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
          message={`Organization ${
            formik.values.id ? "updated" : "created"
          } successfully.`}
        />
      )}
    </>
  );
};

export default OrganizationForm;
