import React, { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { toggleCollapsedNav } from '../../../redux/action/Theme';

//Image
import fatalErrorImg from '../../../assets/dist/img/macaroni-fatal-error.png';

const Error404 = ({ toggleCollapsedNav }) => {

    useEffect(() => {
        toggleCollapsedNav(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <div className="hk-pg-body">
                <Row>
                    <Col xl={7} lg={6} className="d-lg-block d-none">
                        <div className="auth-content py-md-0 py-8">
                            <Row>
                                <Col xl={12} className="text-center">
                                    <img src={fatalErrorImg} className="img-fluid w-sm-80 w-50" alt="login" />
                                    <p className="p-xs mt-5 text-light">Illustrations powered by <a href="https://icons8.com/ouch/" target="_blank" className="text-light" rel="noreferrer"><u>Icons8</u></a></p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xl={5} lg={6} md={7} sm={10}>
                        <div className="auth-content py-8">
                            <div className="w-100">
                                <Row>
                                    <Col xxl={9} xl={8} lg={11}>
                                        <h1 className="display-4 fw-bold mb-2">404</h1>
                                        <p className="p-lg">Sorry, the requested page cannot be found. Try finding with another name.</p>
                                        <Button variant="primary" as={Link} to="/" className="mt-4">Return to app</Button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>

    )
}

const mapStateToProps = ({ theme }) => {
    const { navCollapsed } = theme;
    return { navCollapsed }
};

export default connect(mapStateToProps, { toggleCollapsedNav })(Error404);