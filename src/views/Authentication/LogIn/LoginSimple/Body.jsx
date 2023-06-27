import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { Eye, EyeOff } from "react-feather";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ClientCaptcha from "react-client-captcha";
import { useFormik } from "formik";
import * as Yup from "yup";

import { loginUser } from "../../../../redux/action/authAction";
import AppFormLabel from "../../../../components/Forms/AppFormLabel";
import AppFormControlFeedback from "../../../../components/Forms/AppFormControlFeedback";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../../../utils/common-util";

const initialValues = {
  email: "",
  password: "",
  captcha: "",
};

const Body = ({ loginUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email()
        .matches(EMAIL_REGEX, "Email is not valid")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password should have minimum 8 characters")
        .matches(
          PASSWORD_REGEX,
          "Password should have lowercase, uppercase, number(s) & special character(s)"
        ),
      captcha: Yup.string()
        .oneOf([captchaCode, null], "Captcha does not match")
        .required("Captcha is required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    emailRef?.current?.focus();
  }, [emailRef]);

  const handleSubmit = async (values) => {
    setError("");
    setLoading(true);
    const { email, password } = values;
    const response = await loginUser(email, password);

    if (!response) {
      setLoading(false);
      window.location.href = "/dashboard";
      return;
    }

    setError(response);
    setLoading(false);
    return;
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      formik.isValid && handleSubmit(formik.values);
      event.stopPropagation();
    }
  };

  return (
    <div className="hk-pg-body">
      <Container>
        <Row>
          <Col
            xl={5}
            lg={6}
            md={7}
            sm={10}
            className="position-relative mx-auto"
          >
            <div className="auth-content py-md-0 py-8">
              <Form className="w-100" onSubmit={formik.handleSubmit}>
                <Row>
                  <Col lg={10} className="mx-auto">
                    <h4 className="mb-4">Sign in to your account</h4>
                    <Row className="gx-3">
                      <Col lg={12} as={Form.Group} className="mb-3">
                        <div className="form-label-group">
                          <AppFormLabel
                            htmlFor="email"
                            label="Email"
                            required={true}
                          />
                        </div>
                        <Form.Control
                          id="email"
                          name="email"
                          ref={emailRef}
                          placeholder="Enter your email"
                          type="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          onKeyDown={handleKeyDown}
                          autoComplete="new-email"
                          tabIndex={1}
                          isValid={
                            formik.values.email &&
                            EMAIL_REGEX.test(formik.values.email)
                          }
                          isInvalid={formik.errors.email}
                        />
                      </Col>
                      <Col lg={12} as={Form.Group} className="mb-3">
                        <div className="form-label-group">
                          <AppFormLabel
                            htmlFor="password"
                            label="Password"
                            required={true}
                          />
                          <Link
                            to="/auth/forget-password"
                            className="fs-7 fw-medium"
                            tabIndex={3}
                          >
                            Forgot Password ?
                          </Link>
                        </div>
                        <InputGroup className="password-check">
                          <div className="input-affix-wrapper">
                            <Form.Control
                              id="password"
                              name="password"
                              placeholder="Enter your password"
                              type={showPassword ? "text" : "password"}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.password}
                              onKeyDown={handleKeyDown}
                              isInvalid={formik.errors.password}
                              isValid={
                                formik.values.password &&
                                formik.values.password.length > 8 &&
                                PASSWORD_REGEX.test(formik.values.password)
                              }
                              autoComplete="new-password"
                              tabIndex={2}
                            />
                            <Link
                              to="#"
                              className="input-suffix text-muted"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <span className="feather-icon">
                                {showPassword ? (
                                  <EyeOff className="form-icon" />
                                ) : (
                                  <Eye className="form-icon" />
                                )}
                              </span>
                            </Link>
                          </div>
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={10} className="mx-auto">
                        <Row className="gx-3">
                          <Col
                            lg={12}
                            as={Form.Group}
                            className="mb-3  d-flex justify-content-between align-items-center"
                          >
                            <ClientCaptcha
                              captchaCode={(code) => {
                                setCaptchaCode(code);
                              
                              }}
                            />
                            <Form.Control
                              type="text"
                              className="ms-3"
                              minLength={4}
                              maxLength={4}
                              tabIndex={5}
                              id="captcha"
                              name="captcha"
                              placeholder="Enter captcha"
                              onBlur={formik.handleBlur}
                              onChange={(event) => {
                                const { value } = event.target;
                                formik.setFieldValue("captcha", value);
                              }}
                              value={formik.values.captcha}
                              onKeyDown={handleKeyDown}
                              isInvalid={
                                formik.touched.captcha && formik.errors.captcha
                              }
                              isValid={
                                formik.touched.captcha &&
                                !formik.errors.captcha &&
                                formik.values.captcha.length === 4 &&
                                formik.values.captcha === captchaCode
                              }
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Button
                      className="d-flex justify-content-center align-items-center btn-uppercase btn-block"
                      variant="primary"
                      disabled={!formik.isValid}
                      type="submit"
                      tabIndex={4}
                    >
                      {!loading && <span>Login</span>}
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
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
const mapStateToProps = (state) => ({
  loading: state.loading,
  error: state.error,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Body);
