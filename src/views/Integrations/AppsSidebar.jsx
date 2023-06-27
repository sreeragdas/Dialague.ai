import React from 'react';
import { Button, Form, Nav } from 'react-bootstrap';
import { Archive, Book, Box, Briefcase, CheckSquare, Code, GitBranch, GitHub, Grid, Heart, PenTool, RefreshCw, Settings, Tool, Zap } from 'react-feather';
import { NavLink, useRouteMatch } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import HkTooltip from '../../components/@hk-tooltip/HkTooltip';

const AppsSidebar = () => {
    //All Apps page route
    const allAppRoute = useRouteMatch("/all-apps");

    return (
        <nav className="integrationsapp-sidebar">
            <SimpleBar className="nicescroll-bar">
                <div className="menu-content-wrap">
                    {!allAppRoute && <Form className="mb-4" role="search">
                        <Form.Control type="text" className="form-control" placeholder="Search by categories, name" />
                    </Form>}
                    <div className="menu-group">
                        <Nav as="ul" className="nav-light navbar-nav flex-column">
                            <Nav.Item as="li">
                                <Nav.Link as={NavLink} to="integration" activeClassName="active" >
                                    <span className="nav-icon-wrap">
                                        <span className="feather-icon">
                                            <Box />
                                        </span>
                                    </span>
                                    <span className="nav-link-text">Integrations</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link>
                                    <span className="nav-icon-wrap">
                                        <span className="feather-icon">
                                            <RefreshCw />
                                        </span>
                                    </span>
                                    <span className="nav-link-text">Updates</span>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <div className="menu-gap" />
                    <div className="nav-header">
                        <span>Browse</span>
                    </div>
                    <div className="menu-group">
                        <Nav as="ul" className="nav-light navbar-nav flex-column">
                            <Nav.Item as="li">
                                <Nav.Link as={NavLink} to="all-apps" activeClassName="active" >
                                    <span className="nav-icon-wrap">
                                        <span className="feather-icon">
                                            <Grid />
                                        </span>
                                    </span>
                                    <span className="nav-link-text">All Apps</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link>
                                    <span className="nav-icon-wrap">
                                        <span className="feather-icon">
                                            <Heart />
                                        </span>
                                    </span>
                                    <span className="nav-link-text">Popular</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link as={NavLink} to="integrations-detail" activeClassName="active" >
                                    <span className="nav-icon-wrap">
                                        <span className="feather-icon">
                                            <Zap />
                                        </span>
                                    </span>
                                    <span className="nav-link-text">New Apps</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link>
                                    <span className="nav-icon-wrap">
                                        <span className="feather-icon">
                                            <CheckSquare />
                                        </span>
                                    </span>
                                    <span className="nav-link-text">Recommended for you</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link>
                                    <span className="nav-icon-wrap">
                                        <span className="feather-icon">
                                            <GitBranch />
                                        </span>
                                    </span>
                                    <span className="nav-link-text">Developer Tools</span>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <div className="menu-gap" />
                    <div className="nav-header">
                        <span>Categories</span>
                    </div>
                    <div className="menu-group">
                        <Nav as="ul" className="nav nav-light navbar-nav flex-column">
                            <Nav.Item as="li">
                                <Nav.Link>
                                    <span className="nav-icon-wrap">
                                        <span className="feather-icon">
                                            <PenTool />
                                        </span>
                                    </span>
                                    <span className="nav-link-text">Design</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link>
                                    <span className="nav-icon-wrap">
                                        <span className="feather-icon">
                                            <GitHub />
                                        </span>
                                    </span>
                                    <span className="nav-link-text">Marketing</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link>
                                    <span className="nav-icon-wrap">
                                        <span className="feather-icon">
                                            <Code />
                                        </span>
                                    </span>
                                    <span className="nav-link-text">Technology</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link>
                                    <span className="nav-icon-wrap">
                                        <span className="feather-icon">
                                            <Zap />
                                        </span>
                                    </span>
                                    <span className="nav-link-text">API</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link>
                                    <span className="nav-icon-wrap">
                                        <span className="feather-icon">
                                            <Tool />
                                        </span>
                                    </span>
                                    <span className="nav-link-text">SEO Tools</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link>
                                    <span className="nav-icon-wrap">
                                        <span className="feather-icon">
                                            <Briefcase />
                                        </span>
                                    </span>
                                    <span className="nav-link-text">Management</span>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
            </SimpleBar>
            {/*Sidebar Fixnav*/}
            <div className="integrationsapp-fixednav">
                <div className="hk-toolbar">
                    <Nav as="ul" className="nav-light">
                        <Nav.Item className="nav-link">
                            <Button variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover">
                                <HkTooltip id="tooltip2" placement="top" title="Settings" >
                                    <span className="icon">
                                        <span className="feather-icon">
                                            <Settings />
                                        </span>
                                    </span>
                                </HkTooltip>
                            </Button>
                        </Nav.Item>
                        <Nav.Item className="nav-link">
                            <Button variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover">
                                <HkTooltip id="tooltip3" placement="top" title="Archive" >
                                    <span className="icon">
                                        <span className="feather-icon">
                                            <Archive />
                                        </span>
                                    </span>
                                </HkTooltip>
                            </Button>
                        </Nav.Item>
                        <Nav.Item className="nav-link">
                            <Button variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover">
                                <HkTooltip id="tooltip2" placement="top" title="Help" >
                                    <span className="icon">
                                        <span className="feather-icon">
                                            <Book />
                                        </span>
                                    </span>
                                </HkTooltip>
                            </Button>
                        </Nav.Item>
                    </Nav>
                </div>
            </div>
            {/*/ Sidebar Fixnav*/}
        </nav>
    )
}

export default AppsSidebar
