import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import useDomainList from "../../hooks/useDomainList";
import { client } from "../../axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import SuccessMessage from "../../components/Modals/SuccessMessage";
import AppFormLabel from "../../components/Forms/AppFormLabel";
import AppFormControlFeedback from "../../components/Forms/AppFormControlFeedback";

const mimeTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
];

const initialValues = {
  domain: "",
  sub_domain: "",
  description: "",
  files: [],
};

const CreateNewUpload = ({ show, close }) => {
  const [domainList] = useDomainList(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [subDomainList, setSubDomainList] = useState([]);
  const domainRef = useRef(null);
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      domain: Yup.string().required("Domain is required"),
      sub_domain: Yup.string(),
      description: Yup.string().required("Description is required"),
      files: Yup.mixed().test(
        "is-file-present",
        "File is required",
        (value) => {
          return !!value.length;
        }
      ),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    domainRef?.current?.focus();
  }, [domainRef]);

  useEffect(() => {
    const { domain } = formik.values;
    if (domain && domain !== selectedDomain) {
      setSelectedDomain(domain);
      fetchSubDomainList(domain);
    }
  }, [formik, selectedDomain]);

  const handleSubmit = async (values) => {
    setError("");
    setLoading(true);

    const formData = new FormData();
    const { domain, sub_domain, description, files } = values;
    formData.append("domain", domain);
    formData.append("sub_domain", sub_domain);
    formData.append("description", description);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await client.post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        formik.resetForm();
        setShowSuccessModal(true);
        return true;
      }
    } catch (error) {
      const { data } = error.response;
      if (data.length) {
        setError(data[0]);
        formik.values.files = [];
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubDomainList = async (domainId) => {
    setSubDomainList([]);
    try {
      const { data } = await client.get(`/domains/${domainId}/subdomains/`);

      if (data.length) {
        data?.unshift({
          id: "",
          name: "- Select - ",
        });
      }

      setSubDomainList(data);
    } catch (error) {
      console.error("Error fetching domain list:", error);
    }
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
        <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <Modal.Body>
            <Button bsPrefix="btn-close" onClick={close}>
              <span aria-hidden="true">×</span>
            </Button>
            <h5 className="mb-5">Upload New File</h5>
            <Row className="gx-3">
              <Col sm={6}>
                <Form.Group className="mb-3">
                  <AppFormLabel
                    htmlFor="domain"
                    label="Domain"
                    required={true}
                  />
                  <select
                    ref={domainRef}
                    className={`form-select 
                    ${formik.errors.domain ? "is-invalid" : ""} 
                    ${formik.values.domain ? "is-valid" : ""}`}
                    tabIndex={1}
                    id="domain"
                    name="domain"
                    placeholder="Select Domain"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.domain}
                  >
                    {domainList.map((domain) => (
                      <option value={domain?.id} key={domain?.id}>
                        {domain?.name}
                      </option>
                    ))}
                  </select>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-3">
                  <AppFormLabel
                    htmlFor="sub-domain"
                    label="Sub Domain"
                    required={false}
                  />
                  <select
                    disabled={!selectedDomain || !subDomainList.length}
                    className="form-select"
                    tabIndex={2}
                    id="sub-domain"
                    name="sub_domain"
                    placeholder="Select Subdomain"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.sub_domain}
                  >
                    {subDomainList.map((domain) => (
                      <option value={domain?.id} key={domain?.id}>
                        {domain?.name}
                      </option>
                    ))}
                  </select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="gx-3">
              <Col sm={12} as={Form.Group} className="mb-3">
                <Form.Group className="mb-3">
                  <AppFormLabel
                    htmlFor="files"
                    label="Select File"
                    required={true}
                  />
                  <Form.Control
                    type="file"
                    aria-describedby="upload"
                    aria-label="Upload"
                    accept={mimeTypes.join(",")}
                    tabIndex={3}
                    id="files"
                    name="files"
                    placeholder="Select your file"
                    onChange={(e) => {
                      formik.values.files = e.target.files;
                      formik.validateField("files");
                    }}
                    isInvalid={formik.errors.files}
                    isValid={formik.values.files && formik.values.files.length}
                  />
                </Form.Group>
              </Col>
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
                    tabIndex={4}
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
            {!loading && <span>Create Upload</span>}
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
        <SuccessMessage message="You have successfully uploaded the file." />
      )}
    </>
  );
};

export default CreateNewUpload;
