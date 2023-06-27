import { useState, useRef, useEffect, useMemo } from 'react';
import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import CommanFooter1 from '../CommanFooter1';

//image
import logo from '../../../assets/dist/img/logogpt.jpeg';
import { client } from '../../../axios';

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

const ConfirmPassword = () => {
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const passwordRef = useRef(null);
    const history = useHistory();
    let query = useQuery();

    useEffect(() => {
        setToken(query.get('token'))
        passwordRef?.current?.focus();
    }, [query]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading || !password.length || !confirmPassword.length) {
            return;
        }

        if (password.length < 8 || password.length < 8) {
            setError("Password must be at least 8 characters long!");
            return;
        }

        if (!token || !token.length) {
            setError("Token not found!");
            return;
        }

        if (password && confirmPassword && password !== confirmPassword) {
            setError("Password & Confirm password does not match!");
            return;
        }

        setLoading(true);

        try {
            const response = await client.post('/password_reset/confirm/', { password, token });

            if (response.status === 200) {
                console.log("Password reset successful!")
                history.push("/");
                return;
            }
            console.log("Password reset response ", response);
        } catch (error) {
            console.error('Error resetting the password ', error);
        }

        setError("Failed to reset the password!");
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
                                                    <h4>Reset Password</h4>
                                                    <p className="mb-4">Add your password and confirm the password.</p>
                                                    <Row className="gx-3">
                                                        <Col lg={12} as={Form.Group} className="mb-3">
                                                            <div className="form-label-group">
                                                                <Form.Label htmlFor="password">Password</Form.Label>
                                                            </div>
                                                            <Form.Control
                                                                id="password"
                                                                minLength={8}
                                                                ref={passwordRef}
                                                                placeholder="Enter your password"
                                                                type="password"
                                                                value={password}
                                                                autoComplete="on"
                                                                onChange={(e) => setPassword(e.target.value)} />
                                                        </Col>
                                                    </Row>
                                                    <Row className="gx-3">
                                                        <Col lg={12} as={Form.Group} className="mb-3">
                                                            <div className="form-label-group">
                                                                <Form.Label htmlFor="cpassword">Confirm Password</Form.Label>
                                                            </div>
                                                            <Form.Control
                                                                id="cpassword"
                                                                minLength={8}
                                                                placeholder="Enter confirm password"
                                                                type="password"
                                                                value={confirmPassword}
                                                                autoComplete="on"
                                                                onChange={(e) => setConfirmPassword(e.target.value)} />
                                                        </Col>
                                                    </Row>
                                                    <p className="text-danger mb-5 text-center">{error}</p>
                                                    <Button
                                                        className="d-flex justify-content-center align-items-center btn-uppercase btn-block"
                                                        variant="primary"
                                                        disabled={!password?.length || !confirmPassword?.length || loading} type="submit">
                                                        {!loading && <span>Reset password</span>}
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

export default ConfirmPassword
