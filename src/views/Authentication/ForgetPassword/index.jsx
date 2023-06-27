import { useState, useRef, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import CommanFooter1 from '../CommanFooter1';

//image
import logo from '../../../assets/dist/img/logogpt.jpeg';
import { client } from '../../../axios';

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const emailRef = useRef(null);
    const history = useHistory();

    useEffect(() => {
        emailRef?.current?.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading || !email.length) {
            return;
        }

        setLoading(true);

        try {
            const response = await client.post('/password_reset/', { email });

            if (response.status === 200) {
                console.log("Password reset link sent on the given email!")
                history.push("/");
                return;
            }
            console.log("Forget password response ", response);
        } catch (error) {
            console.error('Error sending the password reset link ', error);
        }

        setError("Failed to send password reset link!");
        setLoading(false);
    }

    return (
        <div className="hk-pg-wrapper pt-0 pb-xl-0 pb-5">
            <div className="hk-pg-body pt-0 pb-xl-0">
                <Container>
                    <Row>
                        <Col sm={10} className="position-relative mx-auto">
                            <div className="auth-content py-8">
                                <Form className="w-100" onSubmit={(e) => handleSubmit(e)}>
                                    <Row>
                                        <Col lg={5} md={7} sm={10} className="mx-auto">
                                            <div className="text-center mb-7">
                                                <Link to="/" className="navbar-brand me-0">
                                                    <img className="brand-img d-inline-block" src={logo} alt="brand" />
                                                </Link>
                                            </div>
                                            <Card className="card-flush">
                                                <Card.Body className="text-center">
                                                    <h4>Forget Password</h4>
                                                    <p className="mb-4">No worries we will mail you a password reset link to your recovery email address to reset your password</p>
                                                    <Row className="gx-3">
                                                        <Col lg={12} as={Form.Group} className="mb-3">
                                                            <div className="form-label-group">
                                                                <Form.Label htmlFor="userName">Email</Form.Label>
                                                            </div>
                                                            <Form.Control
                                                                ref={emailRef}
                                                                placeholder="Your recovery email"
                                                                type="email"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)} />
                                                        </Col>
                                                    </Row>
                                                    <p className="text-danger mb-5 text-center">{error}</p>
                                                    <Button
                                                        className="d-flex justify-content-center align-items-center btn-uppercase btn-block"
                                                        variant="primary"
                                                        disabled={!email?.length || loading} type="submit">
                                                        {!loading && <span>Get Password reset link</span>}
                                                        {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* Page Footer */}
            <CommanFooter1 />
        </div>

    )
}

export default ForgetPassword
