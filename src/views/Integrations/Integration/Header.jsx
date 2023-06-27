import React from 'react';
import classNames from 'classnames';
import { Button, Form, Nav } from 'react-bootstrap';
import { CheckSquare, ChevronDown, ChevronUp, Globe } from 'react-feather';
import { connect } from 'react-redux';
import HkTooltip from '../../../components/@hk-tooltip/HkTooltip';
import { toggleTopNav } from '../../../redux/action/Theme';
import { Link } from 'react-router-dom';

const Header = ({ topNavCollapsed, toggleTopNav, toggleSidebar, show }) => {
    return (
        <header className="integrations-header">
            <div className="d-flex flex-1">
                <Link to="#" className="integrationsapp-title">
                    <h1>Integrations</h1>
                </Link>
                <Form.Select className="d-md-none mw-300p ms-3">
                    <option value={1}>All Integrations</option>
                    <option value={2}>Native Integrations</option>
                </Form.Select>
            </div>
            <div className="h-100 d-md-flex d-none">
                <Nav as="ul" className="nav-line nav-tabs nav-icon nav-light flex-shrink-0 px-2">
                    <Nav.Item as="li">
                        <Nav.Link className="d-flex align-items-center h-100 active">
                            <span className="nav-icon-wrap">
                                <span className="feather-icon">
                                    <CheckSquare />
                                </span>
                            </span>
                            <span className="nav-link-text">All Integrations</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link className="d-flex align-items-center h-100">
                            <span className="nav-icon-wrap">
                                <span className="feather-icon">
                                    <Globe />
                                </span>
                            </span>
                            <span className="nav-link-text">Native Integrations</span>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <div className="integrations-options-wrap justify-content-end flex-1 d-md-flex d-none">
                <Form className="mw-300p flex-grow-1 d-lg-flex d-none" role="search">
                    <Form.Control type="text" placeholder="Search by categories, name, tag" />
                </Form>
                <Button as="a" variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover hk-navbar-togglable" onClick={() => toggleTopNav(!topNavCollapsed)} >
                    <HkTooltip placement={topNavCollapsed ? "bottom" : "top"} title="Collapse" >
                        <span className="icon">
                            <span className="feather-icon">
                                {
                                    topNavCollapsed ? <ChevronDown /> : <ChevronUp />
                                }
                            </span>
                        </span>
                    </HkTooltip>
                </Button>
            </div>
            <div className={classNames("hk-sidebar-togglable", { "active": !show })} onClick={toggleSidebar} />        </header>
    )
}

const mapStateToProps = ({ theme }) => {
    const { topNavCollapsed } = theme;
    return { topNavCollapsed }
};
export default connect(mapStateToProps, { toggleTopNav })(Header);