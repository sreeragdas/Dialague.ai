import React, { useState } from 'react';
import { Button, Card, Col, Dropdown, Form, Nav, Row, Tab } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import * as Icons from 'react-feather';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import ReactApexChart from 'react-apexcharts';
import HkTooltip from '../../../components/@hk-tooltip/HkTooltip';
import { nanoid } from 'nanoid';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import HkInlineEdit from '../../../components/@hk-editable-component/HkInlineEdit';
import HkFileInput from '../../../components/@hk-imag-uploader/HkFileInput';
import HkAlert from '../../../components/@hk-alert/@hk-alert';
import HkChips from '../../../components/@hk-chips/@hk-chips';


//Images
import avatar2 from '../../../assets/dist/img/avatar2.jpg';
import avatar3 from '../../../assets/dist/img/avatar3.jpg';
import avatar4 from '../../../assets/dist/img/avatar4.jpg';
import avatar5 from '../../../assets/dist/img/avatar5.jpg';
import avatar6 from '../../../assets/dist/img/avatar6.jpg';
import avatar7 from '../../../assets/dist/img/avatar7.jpg';
import avatar8 from '../../../assets/dist/img/avatar8.jpg';
import avatar13 from '../../../assets/dist/img/avatar13.jpg';
import img6 from '../../../assets/dist/img/6image.png';
import img2 from '../../../assets/dist/img/2image.png';
import thumb1 from '../../../assets/dist/img/img-thumb1.jpg';

const TaskInfo = ({ close }) => {
    const [recipients, setRecipients] = useState(["Framework", "Html"]);
    const [checkList, setCheckList] = useState([
        { label: "Video conference with canada Team", checked: true, editable: false },
        { label: "Client objective meeting", checked: true, editable: false },
        { label: "Invite jaqueline on video conference", checked: false, editable: false },
    ]);
    const [teamCheckList, setTeamCheckList] = useState([
        { label: "Upgrade dependency on resources", checked: true, editable: false },
        { label: "Invite jaqueline on video conference", checked: false, editable: false },
    ]);

    const [newListLabel1, setnewListLabel1] = useState("");
    const [newListLabel2, setnewListLabel2] = useState("");
    const [showAddButton, setshowAddButton] = useState(true);
    const [newRecipient, setNewRecipient] = useState("");


    //Creating New Chips
    const handleRecipients = () => {
        setRecipients(recipients => recipients.concat(newRecipient));
    }
    const onEnter = ({ key }) => {
        if (key === "Enter") {
            handleRecipients();
            setNewRecipient("");
        }
    }

    //Handle CheckList Checkbox
    const handleCheck = (id, indx) => {
        if (id === "list1") {
            const newCheckList = [...checkList]
            newCheckList[indx].checked = !newCheckList[indx].checked
            setCheckList(newCheckList);
        }
        else if (id === "list2") {
            const newCheckList = [...teamCheckList]
            newCheckList[indx].checked = !newCheckList[indx].checked
            setTeamCheckList(newCheckList);
        }
    }
    //Update CheckList
    const updateCheckList = (id, index) => {
        if (id === "label1") {
            const newCheckLists = [...checkList]
            newCheckLists[index].label = newListLabel1;
            newCheckLists[index].editable = false;
            setCheckList(newCheckLists);
            setnewListLabel1("");
        }
        else if (id === "label2") {
            const newCheckLists = [...teamCheckList]
            newCheckLists[index].label = newListLabel2;
            newCheckLists[index].editable = false;
            setTeamCheckList(newCheckLists);
            setnewListLabel2("");
        };
        setshowAddButton(!showAddButton);
    }

    //add new CheckList
    const addItem = (id, event) => {
        event.preventDefault();
        if (id === "list-1") {
            const newItem = {
                id: nanoid(),
                label: "",
                checked: false,
                editable: true,
            }
            setCheckList([...checkList, newItem]);
        }
        else if (id === "list-2") {
            const newItem = {
                id: nanoid(),
                label: "",
                checked: false,
                editable: true,
            }
            setTeamCheckList([...teamCheckList, newItem])
        };

        setshowAddButton(!showAddButton);

    }

    //Delete CheckList
    const deleteItem = (id, itemId) => {
        if (id === "list1") {
            const newList = [...checkList];
            // const index = checkList.findIndex((item) => item.id === itemId);
            newList.splice(itemId, 1);
            setCheckList(newList);
        }
        else if (id === "list2") {
            const newList = [...teamCheckList];
            // const index = checkList.findIndex((item) => item.id === itemId);
            newList.splice(itemId, 1);
            setTeamCheckList(newList);
        };
    }

    //Apex chart options
    var options = {
        chart: {
            type: 'radialBar',
            width: 50,
            height: 50,
            sparkline: {
                enabled: true
            }
        },
        colors: ['#007D88'],
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: '80%'
                },
                track: {
                    margin: 0,
                    strokeWidth: '97%',
                },
            }
        },
        labels: ['8/12'],

    };
    const series = [85];

    return (
        <div className="task-info">
            <SimpleBar className="nicescroll-bar">
                <header className="task-header">
                    <div className="d-flex align-items-center">
                        <ReactApexChart options={options} series={series} type="radialBar" height={50} width={50} />
                        <Form.Check type="checkbox" className="mx-lg-3 ms-3" label="Mark as completed" id="customCheckcTask" defaultChecked />
                        <Button variant="flush-light" className="flush-outline-hover d-lg-inline-block d-none">
                            <span>
                                <span className="icon">
                                    <span className="feather-icon">
                                        <Icons.Link />
                                    </span>
                                </span>
                                <span>Copy Link</span>
                            </span>
                        </Button>
                        <Button variant="light" className="btn-icon btn-rounded d-lg-none d-lg-inline-block ms-1">
                            <span>
                                <span className="icon">
                                    <span className="feather-icon">
                                        <Icons.Link />
                                    </span>
                                </span>
                            </span>
                        </Button>
                    </div>
                    <div className="task-options-wrap">
                        <span className="task-star marked">
                            <span className="feather-icon">
                                <Icons.Star />
                            </span>
                        </span>
                        <Dropdown>
                            <Dropdown.Toggle variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover no-caret ms-1" >
                                <span className="icon">
                                    <span className="feather-icon">
                                        <Icons.MoreVertical />
                                    </span>
                                </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu align="end" >
                                <Dropdown.Header>Action</Dropdown.Header>
                                <Dropdown.Item>
                                    <span className="feather-icon dropdown-icon">
                                        <Icons.Edit />
                                    </span>
                                    <span>Assign to</span>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <span className="feather-icon dropdown-icon">
                                        <Icons.User />
                                    </span>
                                    <span>Attach files</span>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <span className="feather-icon dropdown-icon">
                                        <Icons.Paperclip />
                                    </span>
                                    <span>Apply Labels</span>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <span className="feather-icon dropdown-icon">
                                        <Icons.Tag />
                                    </span>
                                    <span>Set Due Date</span>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <span className="feather-icon dropdown-icon">
                                        <Icons.Calendar />
                                    </span>
                                    <span>Follow Task</span>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <span className="feather-icon dropdown-icon">
                                        <Icons.Bookmark />
                                    </span>
                                    <span>Set Due Date</span>
                                </Dropdown.Item>
                                <div className="dropdown-divider" />
                                <Dropdown.Item>
                                    <span className="feather-icon dropdown-icon">
                                        <Icons.ArrowUp />
                                    </span>
                                    <span>Set as Top Priority</span>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <span className="feather-icon dropdown-icon">
                                        <Icons.Repeat />
                                    </span>
                                    <span>Change Status</span>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <span className="feather-icon dropdown-icon">
                                        <Icons.Pocket />
                                    </span>
                                    <span>Save as Template</span>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <span className="feather-icon dropdown-icon">
                                        <Icons.Archive />
                                    </span>
                                    <span>Move to archive</span>
                                </Dropdown.Item>
                                <Dropdown.Item className="delete-task">
                                    <span className="feather-icon dropdown-icon">
                                        <Icons.Trash2 />
                                    </span>
                                    <span>Delete</span></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover close-task-info" onClick={close} >
                            <span className="icon">
                                <span className="feather-icon">
                                    <Icons.X />
                                </span>
                            </span>
                        </Button>
                    </div>
                </header>
                <div className="task-detail-body">
                    <HkAlert variant="primary" className="alert-wth-icon">
                        <span className="alert-icon-wrap"><span className="feather-icon"><i className="zmdi zmdi-lock" /></span></span> This task is private for Jampack Team
                    </HkAlert>

                    <HkInlineEdit as="h4" id="editable1" className="fw-bold mb-0" value="Framworking Building" />
                    <HkInlineEdit as="p" id="editable2" className="mb-0" value="Instant rebuilding of assets during development" />

                    <div className="avatar-group avatar-group avatar-group-overlapped mt-3">
                        <div className="avatar avatar-rounded">
                            <HkTooltip title="Katharine" placement="top" >
                                <img src={avatar8} alt="user" className="avatar-img" />
                            </HkTooltip>
                        </div>
                        <div className="avatar avatar-rounded">
                            <HkTooltip title="Dean" placement="top" >
                                <img src={avatar13} alt="user" className="avatar-img" />
                            </HkTooltip>
                        </div>
                        <div className="avatar avatar-xs avatar-soft-danger avatar-rounded">
                            <HkTooltip title="Tom" placement="top" >
                                <span className="initial-wrap">T</span>
                            </HkTooltip>
                        </div>
                        <div className="avatar avatar-rounded">
                            <HkTooltip title="Morgan" placement="top" >
                                <img src={avatar2} alt="user" className="avatar-img" />
                            </HkTooltip>
                        </div>
                        <div className="avatar avatar-icon avatar-primary avatar-rounded">
                            <HkTooltip title="Add New" placement="top" >
                                <span className="initial-wrap">
                                    <span className="feather-icon">
                                        <Icons.Plus />
                                    </span>
                                </span>
                            </HkTooltip>
                        </div>
                    </div>
                    <Form as={Row} >
                        <Col md={6}>
                            <div className="title title-wth-divider my-4">
                                <span>Due Date</span>
                            </div>
                            <DateRangePicker
                                initialSettings={{
                                    singleDatePicker: true,
                                    timePicker: true,
                                    showDropdowns: true,
                                    startDate: new Date(),
                                    locale: {
                                        format: 'M/DD/YYYY hh:mm A',
                                    },
                                }}
                            >
                                <Form.Control type="text" name="single-date" />
                            </DateRangePicker>
                        </Col>
                        <Col md={6}>
                            <div className="title title-wth-divider my-4"><span>Status</span></div>
                            <Dropdown>
                                <Dropdown.Toggle variant="warning" className="btn-rounded dropdown-toggle">In Progress</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Action</Dropdown.Item>
                                    <Dropdown.Item>Another action</Dropdown.Item>
                                    <Dropdown.Item>Something else here</Dropdown.Item>
                                    <Dropdown.Divider as="div" />
                                    <Dropdown.Item>Separated link</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col md={12}>
                            <div className="title title-wth-divider my-4"><span>Labels</span></div>
                            <div className="d-flex flex-wrap">
                                {recipients.map((data, i) => (
                                    <HkChips key={i} className="mb-2 me-2" variant="outline-secondary" dismissable >
                                        {data}
                                    </HkChips>
                                ))}
                                <Form.Control type="text" className="border-0 p-0 shadow-none flex-1 mb-2 me-2" placeholder="Add Chips" value={newRecipient} onChange={e => setNewRecipient(e.target.value)} onKeyPress={onEnter} />
                            </div>
                        </Col>
                    </Form>
                    <Tab.Container defaultActiveKey="checklist" >
                        <Nav justify className="nav-light nav-tabs nav-segmented-tabs active-theme mt-4">
                            <Nav.Item>
                                <Nav.Link eventKey="checklist">
                                    <span className="nav-link-text">Checklist</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="comments">
                                    <span className="nav-link-text badge-on-text">Comments</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="files">
                                    <span className="nav-link-text badge-on-text">Files</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="activity">
                                    <span className="nav-link-text badge-on-text">Activity</span>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content className="mt-7">
                            <Tab.Pane eventKey="checklist">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <div className="title title-lg mb-0"><span>Checklist</span></div>
                                    <a href="#some" className="btn btn-xs btn-icon btn-rounded btn-light" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Add Category"><span className="icon"><span className="feather-icon"><Icons.Plus /> </span></span></a>
                                </div>
                                <div className="hk-checklist">

                                    {checkList.map((data, index) => (
                                        <Form.Check key={index} id={`check_${index}`} >
                                            <Form.Check.Input type="checkbox" checked={data.checked} onChange={() => handleCheck("list1", index)} />
                                            {!data.editable ?
                                                <Form.Check.Label htmlFor={`check_${index}`}>
                                                    {data.label}
                                                    <span className="done-strikethrough" />
                                                </Form.Check.Label>
                                                :
                                                <Form.Check.Label className="mb-3" >
                                                    <Form.Control className="checklist-input" type="text" placeholder="Add new Item" value={newListLabel1} onChange={e => setnewListLabel1(e.target.value)} onKeyPress={e => { if (e.key === "Enter") updateCheckList("label1", index) }} autoFocus />
                                                </Form.Check.Label>
                                            }
                                            <Link to="#" className="btn btn-xs btn-icon btn-rounded btn-flush-light flush-soft-hover delete-checklist" onClick={() => deleteItem("list1", index)} >
                                                <span className="icon">
                                                    <span className="feather-icon">
                                                        <Icons.Trash2 />
                                                    </span>
                                                </span>
                                            </Link>
                                        </Form.Check>
                                    ))}
                                    {showAddButton && <Link to="#" className={classNames("d-flex align-items-center add-new-checklist")} onClick={e => addItem("list-1", e)}>
                                        <span className="feather-icon fe-x me-2"><Icons.PlusSquare /> </span>
                                        <span>New Item</span>
                                    </Link>}
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="title title-wth-divider flex-grow-1 my-4 me-2"><span>Canada team task</span></div>
                                    <div>
                                        <a href="#some" className="btn btn-xs btn-icon btn-rounded btn-flush-light flush-soft-hover delete-checklist" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Edit"><span className="icon"><span className="feather-icon">
                                            <Icons.Edit2 />
                                        </span></span></a>
                                        <a href="#some" className="btn btn-xs btn-icon btn-rounded btn-flush-light flush-soft-hover delete-checklist"><span className="icon"><span className="feather-icon"><Icons.Trash2 /></span></span></a>
                                    </div>
                                </div>
                                <div className="hk-checklist">
                                    {teamCheckList.map((data, index) => (
                                        <Form.Check key={index} id={`check_${index}_team`} >
                                            <Form.Check.Input type="checkbox" checked={data.checked} onChange={() => handleCheck("list2", index)} />
                                            {!data.editable ?
                                                <Form.Check.Label htmlFor={`check_${index}_team`}>
                                                    {data.label}
                                                    <span className="done-strikethrough" />
                                                </Form.Check.Label>
                                                :
                                                <Form.Check.Label className="mb-3" >
                                                    <Form.Control className="checklist-input" type="text" placeholder="Add new Item" value={newListLabel2} onChange={e => setnewListLabel2(e.target.value)} onKeyPress={e => { if (e.key === "Enter") updateCheckList("label2", index) }} autoFocus />
                                                </Form.Check.Label>
                                            }
                                            <Link to="#" className="btn btn-xs btn-icon btn-rounded btn-flush-light flush-soft-hover delete-checklist" onClick={() => deleteItem("list2", index)} >
                                                <span className="icon">
                                                    <span className="feather-icon">
                                                        <Icons.Trash2 />
                                                    </span>
                                                </span>
                                            </Link>
                                        </Form.Check>
                                    ))}
                                    {showAddButton && <Link to="#" className={classNames("d-flex align-items-center add-new-checklist")} onClick={e => addItem("list-2", e)}>
                                        <span className="feather-icon fe-x me-2"><Icons.PlusSquare /> </span>
                                        <span>New Item</span>
                                    </Link>}

                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-5 mb-2">
                                    <div className="title title-lg mb-0"><span>Notes</span></div>
                                    <a href="#some" className="btn btn-xs btn-icon btn-rounded btn-light" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Add Category"><span className="icon"><span className="feather-icon"><Icons.Plus /> </span></span></a>
                                </div>
                                <div className="card card-border note-block bg-orange-light-5">
                                    <Card.Body>
                                        <div className="card-action-wrap">
                                            <Dropdown>
                                                <Dropdown.Toggle size="xs" variant="flus-soft" className="btn-icon btn-rounded flush-soft-hover dropdown-toggle no-caret"><span className="icon">
                                                    <span className="feather-icon">
                                                        <Icons.MoreVertical />
                                                    </span>
                                                </span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu align="end" >
                                                    <Dropdown.Item>Action</Dropdown.Item>
                                                    <Dropdown.Item>Another action</Dropdown.Item>
                                                    <Dropdown.Item>Something else here</Dropdown.Item>
                                                    <Dropdown.Divider as="div" />
                                                    <Dropdown.Item>Separated link</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <div className="media align-items-center">
                                            <div className="media-head">
                                                <div className="avatar avatar-xs avatar-rounded">
                                                    <img src={avatar2} alt="user" className="avatar-img" />
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <div>Martin Luther</div>
                                                <div>9 Apr, 20, 7:14 AM</div>
                                            </div>
                                        </div>
                                        <p>@<a href="#some" className="fw-medium">Charlie Darvin</a> From there, you can run grunt compile, grunt migrate and grunt test to compile your contracts, deploy those contracts to the network, and run their associated unit tests.</p>
                                    </Card.Body>
                                </div>
                                <div className="card card-border note-block bg-orange-light-5">
                                    <Card.Body>
                                        <div className="card-action-wrap">
                                            <Dropdown>
                                                <Dropdown.Toggle size="xs" variant="flus-soft" className="btn-icon btn-rounded flush-soft-hover dropdown-toggle no-caret"><span className="icon">
                                                    <span className="feather-icon">
                                                        <Icons.MoreVertical />
                                                    </span>
                                                </span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu align="end" >
                                                    <Dropdown.Item>Action</Dropdown.Item>
                                                    <Dropdown.Item>Another action</Dropdown.Item>
                                                    <Dropdown.Item>Something else here</Dropdown.Item>
                                                    <Dropdown.Divider as="div" />
                                                    <Dropdown.Item>Separated link</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <div className="media align-items-center">
                                            <div className="media-head">
                                                <div className="avatar avatar-xs avatar-rounded">
                                                    <img src={avatar3} alt="user" className="avatar-img" />
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <div>Katherine Jones</div>
                                                <div>8 Apr, 20, 5:30 PM</div>
                                            </div>
                                        </div>
                                        <p>@<a href="#some" className="fw-medium">Martin Luther</a> Viscosity ratio for "Appear view" link text is 3.7:1 which is less </p>
                                    </Card.Body>
                                </div>
                                <a href="#some" className="btn btn-outline-light btn-block">View more</a>
                            </Tab.Pane>
                            <Tab.Pane eventKey="comments">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <div className="title title-lg mb-0"><span>3 Responses</span></div>
                                    <a href="#some" className="btn btn-xs btn-icon btn-rounded btn-light" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Add Board"><span className="icon"><span className="feather-icon"><Icons.Plus /> </span></span></a>
                                </div>
                                <div className="comment-block">
                                    <div className="media">
                                        <div className="media-head">
                                            <div className="avatar avatar-xs avatar-rounded">
                                                <img src={avatar4} alt="user" className="avatar-img" />
                                            </div>
                                        </div>
                                        <div className="media-body">
                                            <div>
                                                <span className="cm-name">Martin Luther</span>
                                                <span className="badge badge-soft-violet">Manager</span>
                                            </div>
                                            <p>@<a href="#some" className="fw-medium">Charlie Darvin</a> From there, you can run truffle compile, truffle migrate and truffle test to compile your contracts, deploy those contracts to the network, and run their associated unit tests.</p>
                                            <div className="comment-action-wrap mt-3">
                                                <span>3 hours ago</span>
                                                <span className="comment-dot-sep">●</span>
                                                <a href="#some">Reply</a>
                                                <span className="comment-dot-sep">●</span>
                                                <a href="#some">Like</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="separator separator-light" />
                                    <div className="media">
                                        <div className="media-head">
                                            <div className="avatar avatar-xs avatar-rounded">
                                                <img src={avatar2} alt="user" className="avatar-img" />
                                            </div>
                                        </div>
                                        <div className="media-body">
                                            <div>
                                                <span className="cm-name">Katherine Jones</span>
                                            </div>
                                            <p>Dynamically beautiful work done by @<a href="#some" className="fw-medium">Ashton Kutcher</a></p>
                                            <div className="comment-action-wrap mt-3">
                                                <span>3 hours ago</span>
                                                <span className="comment-dot-sep">●</span>
                                                <a href="#some">Reply</a>
                                                <span className="comment-dot-sep">●</span>
                                                <a href="#some">Like</a>
                                            </div>
                                            <div className="media">
                                                <div className="media-head">
                                                    <div className="avatar avatar-xs avatar-rounded">
                                                        <img src={avatar3} alt="user" className="avatar-img" />
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    <div>
                                                        <span className="cm-name">Ashton Kutche</span>
                                                        <span className="badge badge-soft-danger">Designer</span>
                                                    </div>
                                                    <p>@<a href="#some" className="fw-medium">Katherine Jones</a> Thank you :)</p>
                                                    <div className="comment-action-wrap mt-3">
                                                        <span>3 hours ago</span>
                                                        <span className="comment-dot-sep">●</span>
                                                        <a href="#some">Reply</a>
                                                        <span className="comment-dot-sep">●</span>
                                                        <a href="#some">Like</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="separator separator-light" />
                                    <form>
                                        <div className="form-group">
                                            <label className="form-label">Add Comment</label>
                                            <textarea className="form-control" rows={5} defaultValue={""} />
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <button className="btn btn-primary">Send</button>
                                            <small className="form-text text-muted mt-0">Basic HTML is allowed</small>
                                        </div>
                                    </form>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="files">
                                <Row>
                                    <Col sm>
                                        <HkFileInput>
                                            Drop files here to upload
                                        </HkFileInput>
                                    </Col>
                                </Row>
                                <div className="mt-5 mb-2">
                                    <div className="title title-lg mb-0"><span>Shared files</span></div>
                                </div>
                                <div className="file-block">
                                    <div className="collapse-simple">
                                        <Card>
                                            <Card.Header>
                                                <a role="button" data-bs-toggle="collapse" href="#files_collapse" aria-expanded="true">Yesterday</a>
                                            </Card.Header>
                                            <div id="files_collapse" className="collapse show">
                                                <Card.Body>
                                                    <ul className="sh-files">
                                                        <li>
                                                            <div className="media">
                                                                <div className="media-head">
                                                                    <div className="avatar avatar-icon avatar-sm avatar-soft-blue">
                                                                        <span className="initial-wrap fs-3">
                                                                            <i className="ri-file-excel-2-fill" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="media-body">
                                                                    <div>
                                                                        <p className="file-name">website_content.exl</p>
                                                                        <p className="file-size">2,635 KB</p>
                                                                    </div>
                                                                    <div>
                                                                        <div className="avatar avatar-xs avatar-rounded me-2">
                                                                            <img src={avatar2} alt="user" className="avatar-img" />
                                                                        </div>
                                                                        <Dropdown>
                                                                            <Dropdown.Toggle size="sm" variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover no-caret">
                                                                                <span className="icon">
                                                                                    <span className="feather-icon">
                                                                                        <Icons.MoreVertical />
                                                                                    </span>
                                                                                </span>
                                                                            </Dropdown.Toggle>
                                                                            <Dropdown.Menu align="end" >
                                                                                <Dropdown.Item className="ms-0">Download</Dropdown.Item>
                                                                                <Dropdown.Item className="ms-0 link-danger">Delete</Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="media">
                                                                <div className="media-head">
                                                                    <div className="avatar avatar-icon avatar-sm avatar-soft-light">
                                                                        <span className="initial-wrap fs-3">
                                                                            <i className="ri-file-text-fill" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="media-body">
                                                                    <div>
                                                                        <p className="file-name">jampack.pdf</p>
                                                                        <p className="file-size">1.3 GB</p>
                                                                    </div>
                                                                    <div>
                                                                        <div className="avatar avatar-xs avatar-rounded me-2">
                                                                            <img src={avatar3} alt="user" className="avatar-img" />
                                                                        </div>
                                                                        <Dropdown>
                                                                            <Dropdown.Toggle size="sm" variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover no-caret">
                                                                                <span className="icon">
                                                                                    <span className="feather-icon">
                                                                                        <Icons.MoreVertical />
                                                                                    </span>
                                                                                </span>
                                                                            </Dropdown.Toggle>
                                                                            <Dropdown.Menu align="end" >
                                                                                <Dropdown.Item className="ms-0">Download</Dropdown.Item>
                                                                                <Dropdown.Item className="ms-0 link-danger">Delete</Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="media">
                                                                <div className="media-head">
                                                                    <div className="avatar avatar-icon avatar-sm avatar-soft-warning">
                                                                        <span className="initial-wrap fs-3">
                                                                            <i className="ri-file-zip-fill" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="media-body">
                                                                    <div>
                                                                        <p className="file-name">themeforest-pack.zip</p>
                                                                        <p className="file-size">2.45 GB</p>
                                                                    </div>
                                                                    <div>
                                                                        <div className="avatar avatar-xs avatar-soft-danger avatar-rounded me-2">
                                                                            <span className="initial-wrap">H</span>
                                                                        </div>
                                                                        <Dropdown>
                                                                            <Dropdown.Toggle size="sm" variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover no-caret">
                                                                                <span className="icon">
                                                                                    <span className="feather-icon">
                                                                                        <Icons.MoreVertical />
                                                                                    </span>
                                                                                </span>
                                                                            </Dropdown.Toggle>
                                                                            <Dropdown.Menu align="end" >
                                                                                <Dropdown.Item className="ms-0">Download</Dropdown.Item>
                                                                                <Dropdown.Item className="ms-0 link-danger">Delete</Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="media">
                                                                <div className="media-head">
                                                                    <div className="avatar avatar-logo avatar-sm">
                                                                        <span className="initial-wrap">
                                                                            <img src={img6} alt="user" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="media-body">
                                                                    <div>
                                                                        <p className="file-name">bruce-mars-fiEG-Pk6ZASFPk6ZASF</p>
                                                                        <p className="file-size">4,178 KB</p>
                                                                    </div>
                                                                    <div>
                                                                        <div className="avatar avatar-xs avatar-rounded me-2">
                                                                            <img src={avatar5} alt="user" className="avatar-img" />
                                                                        </div>
                                                                        <Dropdown>
                                                                            <Dropdown.Toggle size="sm" variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover no-caret">
                                                                                <span className="icon">
                                                                                    <span className="feather-icon">
                                                                                        <Icons.MoreVertical />
                                                                                    </span>
                                                                                </span>
                                                                            </Dropdown.Toggle>
                                                                            <Dropdown.Menu align="end" >
                                                                                <Dropdown.Item className="ms-0">Download</Dropdown.Item>
                                                                                <Dropdown.Item className="ms-0 link-danger">Delete</Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="media">
                                                                <div className="media-head">
                                                                    <div className="avatar avatar-logo avatar-sm">
                                                                        <span className="initial-wrap">
                                                                            <img src={img2} alt="user" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="media-body">
                                                                    <div>
                                                                        <p className="file-name">jonas-kakaroto-KIPqvvTKIPqvvT</p>
                                                                        <p className="file-size">951 KB</p>
                                                                    </div>
                                                                    <div>
                                                                        <div className="avatar avatar-xs avatar-rounded me-2">
                                                                            <img src={avatar6} alt="user" className="avatar-img" />
                                                                        </div>
                                                                        <Dropdown>
                                                                            <Dropdown.Toggle size="sm" variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover no-caret">
                                                                                <span className="icon">
                                                                                    <span className="feather-icon">
                                                                                        <Icons.MoreVertical />
                                                                                    </span>
                                                                                </span>
                                                                            </Dropdown.Toggle>
                                                                            <Dropdown.Menu align="end" >
                                                                                <Dropdown.Item className="ms-0">Download</Dropdown.Item>
                                                                                <Dropdown.Item className="ms-0 link-danger">Delete</Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </Card.Body>
                                            </div>
                                        </Card>
                                        <Card>
                                            <Card.Header>
                                                <a role="button" data-bs-toggle="collapse" href="#files_collapse_1" aria-expanded="true">23 April</a>
                                            </Card.Header>
                                            <div id="files_collapse_1" className="collapse show">
                                                <Card.Body>
                                                    <ul className="sh-files">
                                                        <li>
                                                            <div className="media">
                                                                <div className="media-head">
                                                                    <div className="avatar avatar-icon avatar-sm avatar-soft-light">
                                                                        <span className="initial-wrap fs-3">
                                                                            <i className="ri-keynote-fill" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="media-body">
                                                                    <div>
                                                                        <p className="file-name">presentation.keynote</p>
                                                                        <p className="file-size">20 KB</p>
                                                                    </div>
                                                                    <div>
                                                                        <div className="avatar avatar-xs avatar-rounded me-2">
                                                                            <img src={avatar5} alt="user" className="avatar-img" />
                                                                        </div>
                                                                        <Dropdown>
                                                                            <Dropdown.Toggle size="sm" variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover no-caret">
                                                                                <span className="icon">
                                                                                    <span className="feather-icon">
                                                                                        <Icons.MoreVertical />
                                                                                    </span>
                                                                                </span>
                                                                            </Dropdown.Toggle>
                                                                            <Dropdown.Menu align="end" >
                                                                                <Dropdown.Item className="ms-0">Download</Dropdown.Item>
                                                                                <Dropdown.Item className="ms-0 link-danger">Delete</Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="media">
                                                                <div className="media-head">
                                                                    <div className="avatar avatar-icon avatar-sm avatar-soft-warning">
                                                                        <span className="initial-wrap fs-3">
                                                                            <i className="ri-file-zip-fill" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="media-body">
                                                                    <div>
                                                                        <p className="file-name">PACK-TRIAL.zip</p>
                                                                        <p className="file-size">2.45 GB</p>
                                                                    </div>
                                                                    <div>
                                                                        <div className="avatar avatar-xs avatar-rounded me-2">
                                                                            <img src={avatar2} alt="user" className="avatar-img" />
                                                                        </div>
                                                                        <a href="#some" className="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret" data-bs-toggle="dropdown"><span className="icon">
                                                                            <span className="feather-icon">
                                                                                <Icons.MoreVertical /></span></span></a>
                                                                        <div className="dropdown-menu dropdown-menu-end">
                                                                            <a className="dropdown-item ms-0" href="#some">Download</a>
                                                                            <a className="dropdown-item ms-0" href="#some">Delete</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="media">
                                                                <div className="media-head">
                                                                    <div className="avatar avatar-sm">
                                                                        <img src={thumb1} alt="user" className="avatar-img" />
                                                                    </div>
                                                                </div>
                                                                <div className="media-body">
                                                                    <div>
                                                                        <p className="file-name">joel-mott-LaK153ghdigaghdi</p>
                                                                        <p className="file-size">3,028 KB</p>
                                                                    </div>
                                                                    <div>
                                                                        <div className="avatar avatar-xs avatar-rounded me-2">
                                                                            <img src={avatar8} alt="user" className="avatar-img" />
                                                                        </div>
                                                                        <a href="#some" className="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret" data-bs-toggle="dropdown"><span className="icon">
                                                                            <span className="feather-icon">
                                                                                <Icons.MoreVertical /></span></span></a>
                                                                        <div className="dropdown-menu dropdown-menu-end">
                                                                            <a className="dropdown-item ms-0" href="#some">Download</a>
                                                                            <a className="dropdown-item ms-0" href="#some">Delete</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </Card.Body>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="activity">
                                <div className="mt-5 mb-2">
                                    <div className="title title-lg mb-0"><span>Latest activity</span></div>
                                </div>
                                <div className="collapse-simple">
                                    <Card>
                                        <Card.Header>
                                            <a role="button" data-bs-toggle="collapse" href="#activity_1" aria-expanded="true">Today</a>
                                        </Card.Header>
                                        <div id="activity_1" className="collapse show">
                                            <Card.Body>
                                                <ul className="activity-list list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <div className="media">
                                                            <div className="media-head">
                                                                <div className="avatar avatar-xs avatar-primary avatar-rounded">
                                                                    <span className="initial-wrap">H</span>
                                                                </div>
                                                            </div>
                                                            <div className="media-body">
                                                                <p><span className="text-dark">Hencework</span> on Documentation link is working now - <a href="#some" className="link-url"><u>ttps://hencework.com/theme/jampa</u></a></p>
                                                                <div className="last-activity-time">Oct 15, 2021, 12:34 PM</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="media">
                                                            <div className="media-head">
                                                                <div className="avatar avatar-xs avatar-rounded">
                                                                    <img src={avatar2} alt="user" className="avatar-img" />
                                                                </div>
                                                            </div>
                                                            <div className="media-body">
                                                                <p><span className="text-dark">Morgan Fregman</span> completed react conversion of <a href="#some" className="link-default"><u>components</u></a></p>
                                                                <div className="last-activity-time">Sep 16, 2021, 4:54 PM</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="media">
                                                            <div className="media-head">
                                                                <div className="avatar avatar-xs avatar-rounded">
                                                                    <img src={avatar13} alt="user" className="avatar-img" />
                                                                </div>
                                                            </div>
                                                            <div className="media-body">
                                                                <p><span className="text-dark">Jimmy Carry</span>completed side bar menu on <a href="#some" className="link-default"><u>elements</u></a></p>
                                                                <div className="last-activity-time">Sep 10, 2021, 10:13 AM</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="media">
                                                            <div className="media-head">
                                                                <div className="avatar avatar-xs avatar-rounded">
                                                                    <img src={avatar7} alt="user" className="avatar-img" />
                                                                </div>
                                                            </div>
                                                            <div className="media-body">
                                                                <p><span className="text-dark">Charlie Chaplin</span> deleted empty cards on <a href="#some" className="link-default"><u>completed</u></a></p>
                                                                <div className="last-activity-time">Sep 10, 2021, 10:13 AM</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </Card.Body>
                                        </div>
                                    </Card>
                                    <Card>
                                        <Card.Header>
                                            <a role="button" data-bs-toggle="collapse" href="#activity_2" aria-expanded="true">Yesterday</a>
                                        </Card.Header>
                                        <div id="activity_2" className="collapse show">
                                            <Card.Body>
                                                <ul className="activity-list list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <div className="media">
                                                            <div className="media-head">
                                                                <div className="avatar avatar-xs avatar-soft-danger avatar-rounded">
                                                                    <span className="initial-wrap">W</span>
                                                                </div>
                                                            </div>
                                                            <div className="media-body">
                                                                <p><span className="text-dark">Winston Churchills</span> created a note on UI components task list</p>
                                                                <div className="last-activity-time">Sep 2, 2021, 9:23 AM</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="media">
                                                            <div className="media-head">
                                                                <div className="avatar avatar-xs avatar-rounded">
                                                                    <img src={avatar2} alt="user" className="avatar-img" />
                                                                </div>
                                                            </div>
                                                            <div className="media-body">
                                                                <p><span className="text-dark">Morgan Fregman</span> completed react conversion of <a href="#some" className="link-default"><u>components</u></a></p>
                                                                <div className="last-activity-time">Sep 16, 2021, 4:54 PM</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="media">
                                                            <div className="media-head">
                                                                <div className="avatar avatar-xs avatar-rounded">
                                                                    <img src={avatar13} alt="user" className="avatar-img" />
                                                                </div>
                                                            </div>
                                                            <div className="media-body">
                                                                <p><span className="text-dark">Jimmy Carry</span>added shared components to <a href="#some" className="link-default"><u>basic structure</u></a></p>
                                                                <div className="last-activity-time">Sep 10, 2021, 10:13 AM</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="media">
                                                            <div className="media-head">
                                                                <div className="avatar avatar-xs avatar-primary avatar-rounded">
                                                                    <span className="initial-wrap">H</span>
                                                                </div>
                                                            </div>
                                                            <div className="media-body">
                                                                <p><span className="text-dark">Hencework</span> commented on <a href="#some" className="link-default"><u>basic structure</u></a></p>
                                                                <div className="last-activity-time">Sep 10, 2021, 10:13 AM</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="media">
                                                            <div className="media-head">
                                                                <div className="avatar avatar-xs avatar-rounded">
                                                                    <img src={avatar7} alt="user" className="avatar-img" />
                                                                </div>
                                                            </div>
                                                            <div className="media-body">
                                                                <p><span className="text-dark">Charlie Chaplin</span> moved components from all modules to in progress</p>
                                                                <div className="last-activity-time">Sep 10, 2021, 10:13 AM</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="media">
                                                            <div className="media-head">
                                                                <div className="avatar avatar-xs avatar-soft-danger avatar-rounded">
                                                                    <span className="initial-wrap">W</span>
                                                                </div>
                                                            </div>
                                                            <div className="media-body">
                                                                <p><span className="text-dark">Winston Churchills</span> created a note on UI components task list</p>
                                                                <div className="last-activity-time">Sep 10, 2021, 10:13 AM</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </Card.Body>
                                        </div>
                                    </Card>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </SimpleBar>
        </div>
    )
}

export default TaskInfo
