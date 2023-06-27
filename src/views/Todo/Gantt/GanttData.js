import { ArrowsSort, SortAscending, SortDescending } from 'tabler-icons-react';
import classNames from 'classnames';
import { Badge, Dropdown } from 'react-bootstrap';
import { MoreVertical, Star } from 'react-feather';

//Images
import avatar2 from '../../../assets/dist/img/avatar2.jpg';
import avatar7 from '../../../assets/dist/img/avatar7.jpg';
import avatar9 from '../../../assets/dist/img/avatar9.jpg';
import avatar10 from '../../../assets/dist/img/avatar10.jpg';
import avatar15 from '../../../assets/dist/img/avatar15.jpg';

//Custom Sorting Caret
const customCaret = (order, column) => {
    if (!order) return (<span>&nbsp;&nbsp;&nbsp;&nbsp; <ArrowsSort size={14} strokeWidth={2.5} /> </span>);
    else if (order === 'asc') return (<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color="#007D88">
        <SortAscending size={14} strokeWidth={2.5} />
    </font></span>);
    else if (order === 'desc') return (<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color="#007D88">
        <SortDescending size={14} strokeWidth={2.5} />
    </font></span>);
    return null;
}
//Custom Sorting Classes
const headerSortingClasses = (column, sortOrder, isLastSorting, colIndex) => (
    sortOrder === 'asc' ? 'text-primary' : 'text-primary'
);


const taskFormater = (cell) => {
    return (
        cell.map((data, indx) => (
            <div className="d-flex align-items-center gt-single-task">
                <div>
                    <span className={classNames("todo-star", { "marked": data.mark })}><span className="feather-icon"><Star /> </span></span>
                    <span className="todo-text">{data.text}</span>
                </div>
            </div>
        ))
    )
}

const avatarFormater = (cell) => {
    return (
        cell.map((data, indx) => (
            <div className="media align-items-center" key={indx} >
                <div className="media-head me-2">
                    <div className={classNames("avatar avatar-xs avatar-rounded", (data.cstmAvt ? `avatar-${data.avtBg}` : ""))}>
                        {data.Img && <img src={data.Img} alt="user" className="avatar-img" />}
                        {data.cstmAvt && <span className="initial-wrap">{data.cstmAvt}</span>}
                    </div>
                </div>
                <div className="media-body">
                    {data.userName}
                </div>
            </div>
        ))
    )
}


//Custom Tag Container
const tagFormater = (cell) => (
    cell ? <Badge
        size="sm"
        bg="white"
        className={classNames("badge-outline badge-wth-icon", { "badge-danger": cell === "High" || cell === "Urgent" }, { "badge-warning": cell === "Low" }, { "badge-orange": cell === "Medium" })}
    >
        <span>
            <i className="badge-dot ri-checkbox-blank-circle-fill" />
            {cell}
        </span>
    </Badge>
        :
        null
)

//Status Container
const statusFormater = (cell) => {
    return (
        cell.map((data, indx) => (
            <Dropdown className="selectable-dropdown">
                <Dropdown.Toggle variant={data.variant} className="btn-rounded" type="button">{data.status}</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item data-color="#5e7d8a">On Hold</Dropdown.Item>
                    <Dropdown.Item data-color="#FFC400">In Progress</Dropdown.Item>
                    <Dropdown.Item data-color="#9e9e9e">To-Do</Dropdown.Item>
                    <Dropdown.Item data-color="#007D88">Done</Dropdown.Item>
                    <Dropdown.Item data-color="#FF0101">Pending</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        ))
    )
}

//Custom Action Container
const actionFormater = (cell) => {
    return (
        cell.map((data, indx) => (
            <Dropdown>
                <Dropdown.Toggle variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover dropdown-toggle no-caret">
                    <span className="icon">
                        <span className="feather-icon">
                            <MoreVertical />
                        </span>
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu align="end" >
                    <Dropdown.Item data-color="#5e7d8a">On Hold</Dropdown.Item>
                    <Dropdown.Item data-color="#FFC400">In Progress</Dropdown.Item>
                    <Dropdown.Item data-color="#9e9e9e">To-Do</Dropdown.Item>
                    <Dropdown.Item data-color="#007D88">Done</Dropdown.Item>
                    <Dropdown.Item data-color="#FF0101">Pending</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        ))
    )
}


export const columns = [
    {
        dataField: "id",
        text: "ID",
        hidden: true,
    },
    {
        dataField: "task",
        text: "Task",
        sort: true,
        formatter: taskFormater,
        sortValue: (cell, row) => (cell.map((data) => (data.text))),
        sortCaret: customCaret,
        headerSortingClasses
    },
    {
        dataField: "priority",
        text: "Priority",
        sort: true,
        formatter: tagFormater,
        sortCaret: customCaret,
        headerSortingClasses,
    },
    {
        dataField: "assignee",
        text: "Assignee",
        sort: true,
        formatter: avatarFormater,
        sortValue: (cell, row) => (cell.map((data) => (data.userName))),
        sortCaret: customCaret,
        headerSortingClasses
    },
    {
        dataField: "due_date",
        text: "Due Date",
        sort: true,
        sortCaret: customCaret,
        headerSortingClasses
    },
    {
        dataField: "status",
        text: "Status",
        sort: true,
        formatter: statusFormater,
        sortCaret: customCaret,
        headerSortingClasses
    },
    {
        dataField: "actions",
        text: "",
        formatter: actionFormater,
    },
];

export const data = [
    {
        id: 1,
        task: [{ text: "Video conference with Canada Team", mark: true }],
        priority: "High",
        assignee: [{ Img: avatar7, userName: " Tom Cruz" }],
        due_date: "Tomorrow",
        status: [{ status: "To-Do", variant: "secondary" }],
        actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }]
    },
    {
        id: 2,
        task: [{ text: "Client objective meeting", mark: false }],
        priority: "High",
        assignee: [{ Img: avatar9, userName: "Katherine Jones" }],
        due_date: <span className="text-danger">Yesterday</span>,
        status: [{ status: "In Progres", variant: "warning" }],
        actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }]
    },
    {
        id: 3,
        task: [{ text: "Target market trend analysis on the go", mark: false }],
        assignee: [{ Img: avatar7, userName: "Tom Cruz" }],
        due_date: "Today",
        status: [{ status: "Done", variant: "primary" }],
        actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }]
    },
    {
        id: 4,
        task: [{ text: "Send revised proposal to Mr. Dow Jones", mark: true }],
        priority: "Low",
        assignee: [{ Img: avatar10, userName: "Martin Lutherking" }],
        due_date: "Saturday",
        status: [{ status: "On Hold", variant: "info" }],
        actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }]
    },
    {
        id: 5,
        task: [{ text: "Set up first call for demo", mark: false }],
        assignee: [{ cstmAvt: "H", avtBg: "primary", userName: "Hencework" }],
        due_date: "Sunday",
        status: [{ status: "In Progress", variant: "warning" }],
        actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }]
    },
    {
        id: 6,
        task: [{ text: "Upgrade dependency on resouces", mark: true }],
        priority: "Medium",
        assignee: [{ Img: avatar15, userName: "Boss Baby" }],
        due_date: "27 Nov, 2020",
        status: [{ status: "Pending", variant: "danger" }],
        actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }]
    },
    {
        id: 7,
        task: [{ text: "Update contribution guidelines and licence", mark: false }],
        assignee: [{ Img: avatar15, userName: "Boss Baby" }],
        due_date: "Today",
        status: [{ status: "Done", variant: "primary" }],
        actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }]
    },
    {
        id: 8,
        task: [{ text: "Fix tooltip word wrap/break rules", mark: false }],
        priority: "High",
        assignee: [{ Img: avatar2, userName: "Morgan Freeman" }],
        due_date: <span className="text-danger">4 Days ago</span>,
        status: [{ status: "In Progress", variant: "warning" }],
        actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }]
    },
    {
        id: 9,
        task: [{ text: "Redesigning the base model", mark: true }],
        priority: "Urgent",
        assignee: [{ Img: avatar2, userName: "Charlie Chaplin" }],
        due_date: "3 Aug, 2020",
        status: [{ status: "In Progress", variant: "warning" }],
        actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }]
    },
    {
        id: 10,
        task: [{ text: "Configure security analysis feature", mark: true }],
        priority: "Medium",
        assignee: [{ Img: avatar2, userName: "Tom Cruz" }],
        due_date: "8 Aug, 2020",
        status: [{ status: "On Hold", variant: "info" }],
        actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }]
    },
    {
        id: 11,
        task: [{ text: "Remove notifications panel from inbox", mark: false }],
        priority: "Urgent",
        assignee: [{ Img: avatar2, userName: "Boss Baby" }],
        due_date: "24 Sep, 2020",
        status: [{ status: "To-Do", variant: "secondary" }],
        actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }]
    },
    {
        id: 12,
        task: [{ text: "Send an invite to join project", mark: false }],
        priority: "Low",
        assignee: [{ Img: avatar7, userName: "Tom Cruz" }],
        due_date: <span className="text-danger">Yesterday</span>,
        status: [{ status: "In Progress", variant: "warning" }],
        actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }]
    },
    {
        id: 13,
        task: [{ text: "Connect to software tools", mark: false }],
        priority: "High",
        assignee: [{ Img: avatar10, userName: "Martin Lutherking" }],
        due_date: "Saturday",
        status: [{ status: "Done", variant: "primary" }],
        actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }]
    },
    {
        id: 14,
        task: [{ text: "Speed up project review with planner", mark: false }],
        priority: "High",
        assignee: [{ Img: avatar9, userName: "Katherine Jones" }],
        due_date: "15 Oct, 2020",
        status: [{ status: "Done", variant: "primary" }],
        actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }]
    },
    // {
    //     id: 4,
    //     task: [{ text: "Update contribution guidelines and licence", mark: false }],
    //     priority: "Low",
    //     assignee: [{ Img: avatar7, userName: "Morgan Freeman" }],
    //     due_date: "Today",
    //     status: [{ status: "Done", variant: "primary" }],
    //     actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }]
    // },

]