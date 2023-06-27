import React from 'react';
import SimpleBar from 'simplebar-react';
import { Button, Card, Form, ListGroup } from 'react-bootstrap';
import { Plus } from 'react-feather';

//Images
import avatar2 from '../../../assets/dist/img/avatar2.jpg';
import avatar7 from '../../../assets/dist/img/avatar7.jpg';
import avatar9 from '../../../assets/dist/img/avatar9.jpg';
import avatar10 from '../../../assets/dist/img/avatar10.jpg';
import avatar13 from '../../../assets/dist/img/avatar13.jpg';
import avatar15 from '../../../assets/dist/img/avatar15.jpg';

const TaskboardInfo = ({onHide}) => {
    return (
        <div className="taskboard-info">
            <SimpleBar className="nicescroll-bar">
                <Button bsPrefix="btn-close" type="button" className="info-close mb-10" onClick={onHide}>
                    <span aria-hidden="true">×</span>
                </Button>
                <Form role="search" className="mt-xl-0 mt-5">
                    <Form.Control type="text" placeholder="Search in conversation" />
                </Form>
                <div className="collapse-simple mt-4">
                    <Card>
                        <Card.Header>
                            <a role="button" data-bs-toggle="collapse" href="#members" aria-expanded="true">Members</a>
                        </Card.Header>
                        <div id="members" className="collapse show">
                            <Card.Body>
                                <ul className="hk-list">
                                    <li>
                                        <div className="avatar avatar-sm avatar-primary avatar-rounded" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Hencework">
                                            <span className="initial-wrap">H</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="avatar avatar-sm avatar-rounded" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Morgan">
                                            <img src={avatar2} alt="user" className="avatar-img" />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="avatar avatar-sm avatar-rounded" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Charlie">
                                            <img src={avatar13} alt="user" className="avatar-img" />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="avatar avatar-sm avatar-rounded position-relative" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Tom">
                                            <img src={avatar7} alt="user" className="avatar-img" />
                                            <span className="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1" />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="avatar avatar-sm avatar-rounded" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Katherine">
                                            <img src={avatar9} alt="user" className="avatar-img" />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="avatar avatar-sm avatar-rounded position-relative" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Danial">
                                            <img src={avatar10} alt="user" className="avatar-img" />
                                            <span className="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1" />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="avatar avatar-sm avatar-rounded position-relative" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Boss">
                                            <img src={avatar15} alt="user" className="avatar-img" />
                                            <span className="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1" />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="avatar avatar-sm avatar-soft-danger avatar-rounded" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Winston">
                                            <span className="initial-wrap">W</span>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="#some" className="avatar avatar-sm avatar-icon avatar-soft-light avatar-rounded" data-bs-toggle="modal" data-bs-target="#invite_people">
                                            <span className="initial-wrap" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Add New">
                                                <span className="feather-icon"><Plus /></span>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </Card.Body>
                        </div>
                    </Card>
                    <Card>
                        <Card.Header>
                            <a role="button" data-bs-toggle="collapse" href="#activity" aria-expanded="true">Latest Activity</a>
                        </Card.Header>
                        <div id="activity" className="collapse show">
                            <Card.Body>
                                <ListGroup as="ul" variant="flush" className="activity-list">
                                    <ListGroup.Item>
                                        <div className="media">
                                            <div className="media-head">
                                                <div className="avatar avatar-sm avatar-primary avatar-rounded">
                                                    <span className="initial-wrap">H</span>
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <p><span className="text-dark">Hencework</span> on Documentation link is working now - <a href="#some" className="link-url"><u>ttps://hencework.com/theme/jampa</u></a></p>
                                                <div className="last-activity-time">Oct 15, 2021, 12:34 PM</div>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="media">
                                            <div className="media-head">
                                                <div className="avatar avatar-sm avatar-rounded">
                                                    <img src={avatar2} alt="user" className="avatar-img" />
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <p><span className="text-dark">Morgan Fregman</span> completed react conversion of <a href="#some" className="link-default"><u>components</u></a></p>
                                                <div className="last-activity-time">Sep 16, 2021, 4:54 PM</div>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="media">
                                            <div className="media-head">
                                                <div className="avatar avatar-sm avatar-rounded">
                                                    <img src={avatar13} alt="user" className="avatar-img" />
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <p><span className="text-dark">Jimmy Carry</span>completed side bar menu on <a href="#some" className="link-default"><u>elements</u></a></p>
                                                <div className="last-activity-time">Sep 10, 2021, 10:13 AM</div>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="media">
                                            <div className="media-head">
                                                <div className="avatar avatar-sm avatar-rounded">
                                                    <img src={avatar7} alt="user" className="avatar-img" />
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <p><span className="text-dark">Charlie Chaplin</span> deleted empty cards on <a href="#some" className="link-default"><u>completed</u></a></p>
                                                <div className="last-activity-time">Sep 10, 2021, 10:13 AM</div>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="media">
                                            <div className="media-head">
                                                <div className="avatar avatar-sm avatar-soft-danger avatar-rounded">
                                                    <span className="initial-wrap">W</span>
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <p><span className="text-dark">Winston Churchills</span> created a note on UI components task list</p>
                                                <div className="last-activity-time">Sep 2, 2021, 9:23 AM</div>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="media">
                                            <div className="media-head">
                                                <div className="avatar avatar-sm avatar-rounded">
                                                    <img src={avatar2} alt="user" className="avatar-img" />
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <p><span className="text-dark">Morgan Fregman</span> completed react conversion of <a href="#some" className="link-default"><u>components</u></a></p>
                                                <div className="last-activity-time">Sep 16, 2021, 4:54 PM</div>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="media">
                                            <div className="media-head">
                                                <div className="avatar avatar-sm avatar-rounded">
                                                    <img src={avatar13} alt="user" className="avatar-img" />
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <p><span className="text-dark">Jimmy Carry</span>added shared components to <a href="#some" className="link-default"><u>basic structure</u></a></p>
                                                <div className="last-activity-time">Sep 10, 2021, 10:13 AM</div>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="media">
                                            <div className="media-head">
                                                <div className="avatar avatar-sm avatar-primary avatar-rounded">
                                                    <span className="initial-wrap">H</span>
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <p><span className="text-dark">Hencework</span> commented on <a href="#some" className="link-default"><u>basic structure</u></a></p>
                                                <div className="last-activity-time">Sep 10, 2021, 10:13 AM</div>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="media">
                                            <div className="media-head">
                                                <div className="avatar avatar-sm avatar-rounded">
                                                    <img src={avatar7} alt="user" className="avatar-img" />
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <p><span className="text-dark">Charlie Chaplin</span> moved components from all modules to in progress</p>
                                                <div className="last-activity-time">Sep 10, 2021, 10:13 AM</div>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="media">
                                            <div className="media-head">
                                                <div className="avatar avatar-sm avatar-soft-danger avatar-rounded">
                                                    <span className="initial-wrap">W</span>
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <p><span className="text-dark">Winston Churchills</span> created a note on UI components task list</p>
                                                <div className="last-activity-time">Sep 10, 2021, 10:13 AM</div>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </div>
                    </Card>
                </div>
            </SimpleBar>
        </div>
    )
}

export default TaskboardInfo
