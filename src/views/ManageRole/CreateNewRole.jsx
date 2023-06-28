import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import OutlinedInput from '@mui/material/OutlinedInput';
import * as Yup from "yup";
import usePermissionList from "../../hooks/usePermissionList";
import { client } from "../../axios";
import SuccessMessage from "../../components/Modals/SuccessMessage";
import AppFormControlFeedback from "../../components/Forms/AppFormControlFeedback";
import AppFormLabel from "../../components/Forms/AppFormLabel";
import { NAME_WITH_SPACE_REGEX } from "../../utils/common-util";
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
const initialDomain = {
  name: "",
  permission: [],
};

const CreateNewRole = ({ show, close, domainData = initialDomain }) => {
  const [permissionList] = usePermissionList(true);
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
      permission: Yup.array().required("Permission is required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    nameRef?.current?.focus();
  }, [nameRef]);

  const handleSubmit = async (values) => {
    setError("");
    setLoading(true);

    try {
      let response = null;
      if (values.id) {
        response = await client.patch(`/groups/${values.id}/`, values);
      } else {
        response = await client.post(`/groups/`, { ...values });
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

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 224,
        width: 250,
      },
    },
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
              {formik.values.id ? "Update" : "Create"} Role
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
                    htmlFor="permission"
                    label="Permission"
                    required={false}
                  />
                

<Select
  multiple
  value={formik.values.permission || []} // Provide a default empty array
  onChange={(event) =>
    formik.setFieldValue("permission", event.target.value)
  }
  onBlur={formik.handleBlur}
  input={<OutlinedInput id="permission" />}
  renderValue={(selected) => (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {selected &&
        selected.map((value) => (
          <Chip key={value} label={value} style={{ margin: 2 }} />
        ))}
    </div>
  )}
  MenuProps={MenuProps}
>
  {permissionList.map((permission) => (
    <MenuItem key={permission.id} value={permission.name}>
      <Checkbox
        checked={
          (formik.values.permission || []).includes(permission.name)
        } // Provide a default empty array
        name={permission.name}
        color="primary"
      />
      <ListItemText primary={permission.name} />
    </MenuItem>
  ))}
</Select>




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
              <span>{formik.values.id ? "Update" : "Create"} Role</span>
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
          message={`Role ${
            formik.values.id ? "updated" : "created"
          } successfully.`}
        />
      )}
    </>
  );
};

export default CreateNewRole;
