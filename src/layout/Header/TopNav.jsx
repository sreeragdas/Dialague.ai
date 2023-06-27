import React, { useState } from 'react';
//Images
import avatar12 from '../../assets/dist/img/avatar12.jpg';
import { AlignLeft, LogOut, } from 'react-feather';
import { Button, Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { toggleCollapsedNav } from '../../redux/action/Theme';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { client } from '../../axios';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
const TopNav = ({ navCollapsed, toggleCollapsedNav }) => {
    const [user, setUser] = useState(null);
    const history = useHistory()

    const handleLogOut = async () => {
        await client.post(`/logout/`)
            .then(() => {
                localStorage.clear();
                sessionStorage.clear();
                history.push('/auth/login');
            });
    }

    useEffect(() => {
        const user = sessionStorage.getItem("user");

        if (user) {
            setUser(JSON.parse(user)?.user);
        }
    }, [sessionStorage]);

    const getInitials = () => {
        const firstNameInitial = user?.first_name?.charAt(0);
        const lastNameInitial = user?.last_name?.charAt(0);
        return `${firstNameInitial}${lastNameInitial}`;
    }

    const getFullName = () => {
        const firstNameInitial = user?.first_name;
        const lastNameInitial = user?.last_name;
        return `${firstNameInitial} ${lastNameInitial}`;
    }


    return (
        <Navbar expand="xl" className="hk-navbar navbar-light fixed-top" >
            <Container fluid>
                <div className="nav-start-wrap">
                    <Button variant="flush-dark" onClick={() => toggleCollapsedNav(!navCollapsed)} className="btn-icon btn-rounded flush-soft-hover navbar-toggle d-xl-none">
                        <span className="icon">
                            <span className="feather-icon"><AlignLeft /></span>
                        </span>
                    </Button>
                </div>

                <div className="nav-end-wrap">
                    <Nav className="navbar-nav flex-row">
                        <Nav.Item>
                            <Dropdown className="ps-2">
                                <Dropdown.Toggle as={Link} to="#" className="no-caret">
                                    <div className="avatar avatar-rounded avatar-xs">
                                        <img src={avatar12} alt="user" className="avatar-img" />
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end">
                                    <div className="p-2">
                                        <div className="media">
                                            <div className="media-head me-2">
                                                <div className="avatar avatar-primary avatar-sm avatar-rounded">
                                                    <span className="initial-wrap">{getInitials()}</span>
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <div className="fs-7 text-nowrap">{getFullName()}</div>
                                                <div className="fs-7 text-nowrap">{user?.email}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <Dropdown.Divider as="div" />
                                    <Dropdown.Item onClick={handleLogOut}>
                                        <span className="dropdown-icon feather-icon">
                                            <LogOut />
                                        </span>
                                        <span>Sign Out</span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav.Item>
                    </Nav>
                </div>
                {/* /End Nav */}
            </Container>
        </Navbar>
    )
}

const mapStateToProps = ({ theme }) => {
    const { navCollapsed } = theme;
    return { navCollapsed }
};

export default connect(mapStateToProps, { toggleCollapsedNav })(TopNav);