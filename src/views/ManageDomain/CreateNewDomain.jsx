import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import useDomainList from "../../hooks/useDomainList";
import { client } from "../../axios";
import SuccessMessage from "../../components/Modals/SuccessMessage";
import AppFormControlFeedback from "../../components/Forms/AppFormControlFeedback";
import AppFormLabel from "../../components/Forms/AppFormLabel";
import { NAME_WITH_SPACE_REGEX } from "../../utils/common-util";

const initialDomain = {
  id: "",
  name: "",
  description: "",
};

const CreateNewDomain = ({ show, close, domainData = initialDomain }) => {
  console.log(domainData , 'domainDatadomainDatadomainData')
  const [domainList] = useDomainList(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const nameRef = useRef(null);
  const formik = useFormik({
    initialValues: domainData,
    validationSchema: Yup.object({
      id: Yup.string(),
      name: Yup.string()
        .required("Name is required")
        .matches(NAME_WITH_SPACE_REGEX, "Name is not valid"),
      description: Yup.string().required("Description is required"),
    }),

    
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  console.log(formik.values.id , 'iiiiiiiiiiiiiiiddddddd')
  console.log(formik.initialValues.id , 'iddddddddddddddddddddddd')
  useEffect(() => {
    nameRef?.current?.focus();
  }, [nameRef]);

  const handleSubmit = async (values) => {
    setError("");
    setLoading(true);

    try {
      let response = null;
      if (values.id) {
        response = await client.patch(`/domains/${values.id}/`, values);
      } else {
        const { user } = JSON.parse(sessionStorage.getItem("user"));
        response = await client.post(`/domains/`, {
          ...values,
          org: user?.organization,
        });
      }

      if (response.status === 200 || response.status === 201) {
        formik.resetForm();
        setShowSuccessModal(true);
        return true;
      }
    } catch (error) {
      setError(`Unable to ${values.id ? "update" : "create"} domain.`);
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
              {formik.values.id ? "Update" : "Create"} Domain
            </h5>
            <Row className="gx-3">
              <Col sm={12}>
                <Form.Group className="mb-3">
                  <AppFormLabel htmlFor="name" label="Name" required={true} />
                  <Form.Control
                    ref={nameRef}
                    tabIndex={1}
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    isInvalid={formik.errors.name}
                    isValid={
                      formik.values.name &&
                      NAME_WITH_SPACE_REGEX.test(formik.values.name)
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
              <span>{formik.values.id ? "Update" : "Create"} Domain</span>
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
          message={`Domain ${
            formik.values.id ? "updated" : "created"
          } successfully.`}
        />
      )}
    </>
  );
};

export default CreateNewDomain;
