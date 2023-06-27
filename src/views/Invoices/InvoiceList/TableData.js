import React from 'react';
import { Archive, Edit, Trash2 } from 'react-feather';
import { ArrowsSort, SortAscending, SortDescending } from 'tabler-icons-react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HkBadge from '../../../components/@hk-badge/@hk-badge';


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

//Custom Reciplent Container
const reciplentFormater = (cell) => {
    return (
        cell.map((data, indx) => (
            <React.Fragment key={indx}>
                <div className="text-dark">{data.title}</div>
                <div className="fs-7">{data.id}</div>
            </React.Fragment>
        ))
    )
}

//Custom Tag Container
const tagFormater = (cell) => {
    return (
        cell.map((data, indx) => (
            <React.Fragment key={indx}>
                <HkBadge bg={data.bg} text={data.color} className="my-1  me-2" >{data.title}</HkBadge>
                <div className="fs-8 mt-1">{data.text}</div>
            </React.Fragment>
        ))
    )
}


//Custom Action Container
const actionFormater = (cell) => {
    return (
        cell.map((data, indx) => (
            <div className="d-flex align-items-center" key={indx} >
                <Dropdown as={ButtonGroup} className="btn-group selectable-split-dropdown">
                    <Button variant="outline-light" type="button" className="btn-dyn-text w-100p">Edit</Button>
                    <Dropdown.Toggle variant="outline-light" split className="me-3">
                        <span className="sr-only">Toggle Dropdown</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                        <Dropdown.Item eventKey="Remind" >Remind</Dropdown.Item>
                        <Dropdown.Item eventKey="Sent" >Sent</Dropdown.Item>
                        <Dropdown.Item eventKey="Active" >Active</Dropdown.Item>
                        <Dropdown.Divider as="div" />
                        <Dropdown.Item eventKey="Edit" >Edit</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div className="d-flex">
                    <Button variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover">
                        <span className="btn-icon-wrap">
                            <span className="feather-icon">
                                <Archive />
                            </span>
                        </span>
                    </Button>
                    <Button variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover" href={data.actionLink} >
                        <span className="btn-icon-wrap">
                            <span className="feather-icon">
                                <Edit />
                            </span>
                        </span>
                    </Button>
                    <Button variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover">
                        <span className="btn-icon-wrap">
                            <span className="feather-icon">
                                <Trash2 />
                            </span>
                        </span>
                    </Button>
                </div>
            </div>
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
        dataField: "invoice",
        text: "Invoice #",
        sort: false,
        formatter: (cell) => <Link to="#" className="table-link-text link-high-em">{cell}</Link>,
        sortCaret: customCaret,
        headerSortingClasses,
    },
    {
        dataField: "date",
        text: "Date",
        sort: true,
        sortCaret: customCaret,
        headerSortingClasses
    },
    {
        dataField: "reciplent",
        text: "Reciplent",
        sort: true,
        formatter: reciplentFormater,
        sortCaret: customCaret,
        sortValue: (cell, row) => (cell.map((data) => (data.title))),
        headerSortingClasses
    },
    {
        dataField: "status",
        text: "Status",
        sort: true,
        formatter: tagFormater,
        sortCaret: customCaret,
        headerSortingClasses
    },
    {
        dataField: "activity",
        text: "Activity",
        sort: true,
        sortCaret: customCaret,
        headerSortingClasses
    },
    {
        dataField: "amount",
        text: "Amount",
        sort: true,
        sortCaret: customCaret,
        headerSortingClasses
    },
    {
        dataField: "actions",
        text: "Actions",
        formatter: actionFormater,
    },
];

export const data = [
    {
        id: 1,
        invoice: "11234",
        date: "13 Jan, 2020",
        reciplent: [{ title: "Patrik Schelton", id: "morgan@jampack.com" }],
        status: [{ title: "draft", bg: "light", color: "dark" }],
        activity: "-",
        amount: "$ 2,300.00 USD",
        actions: [{ actionLink: "#", }]
    },
    {
        id: 2,
        invoice: "11235",
        date: "13 Jan, 2020",
        reciplent: [{ title: "Huma Therman", id: "huma@clariesup.au" }],
        status: [{ title: "Unpaid", bg: "danger", text: "Due 25 Apr 2020" }],
        activity: "Sent",
        amount: "$ 780.00 USD",
        actions: [{ actionLink: "#", }]
    },
    {
        id: 3,
        invoice: "11236",
        date: "13 Jan, 2020",
        reciplent: [{ title: "Charlie Chaplin", id: "charlie@leernoca.monster" }],
        status: [{ title: "Paid", bg: "primary" }],
        activity: "Done",
        amount: "$ 567.00 USD",
        actions: [{ actionLink: "#", }]
    },
    {
        id: 4,
        invoice: "11237",
        date: "13 Jan, 2020",
        reciplent: [{ title: "Winston Churchil", id: "winston@worthniza.ga" }],
        status: [{ title: "Unpaid", bg: "danger", text: "Due 12 Sep 2020" }],
        activity: "-",
        amount: "$ 1,500.00 USD",
        actions: [{ actionLink: "#", }]
    },
    {
        id: 5,
        invoice: "11238",
        date: "13 Jan, 2020",
        reciplent: [{ title: "Jaquiline Joker", id: "jaquljoker@jampack.com" }],
        status: [{ title: "Unpaid", bg: "danger", text: "Due 18 Oct 2020" }],
        activity: "Sent",
        amount: "$ 900.00 USD",
        actions: [{ actionLink: "#", }]
    },
    {
        id: 6,
        invoice: "11239",
        date: "3 July, 2020",
        reciplent: [{ title: "Tom Cruz", id: "tomcz@jampack.com" }],
        status: [{ title: "Paid", bg: "primary" }],
        activity: "Done",
        amount: "$ 4,750.00 USD",
        actions: [{ actionLink: "#", }]
    },
    {
        id: 7,
        invoice: "11240",
        date: "24 Jun, 2019",
        reciplent: [{ title: "Danial Craig", id: "danialc@jampack.com" }],
        status: [{ title: "Paid", bg: "primary", text: "Due 25 Apr 2020" }],
        activity: "Done",
        amount: "$ 2,300.00 USD",
        actions: [{ actionLink: "#", }]
    },
    {
        id: 8,
        invoice: "11241",
        date: "24 Jun, 2019",
        reciplent: [{ title: "Katharine Jones", id: "joneskath@jampack.com" }],
        status: [{ title: "Paid", bg: "primary" }],
        activity: "Done",
        amount: "$ 7,650.00 USD",
        actions: [{ actionLink: "#", }]
    },
    {
        id: 9,
        invoice: "11242",
        date: "24 Jun, 2019",
        reciplent: [{ title: "Hence Work", id: "contact@hencework.com" }],
        status: [{ title: "Draft", bg: "light", color: "dark" }],
        activity: "-",
        amount: "$ 4,500.00 USD",
        actions: [{ actionLink: "https://hencework.com/", }]
    },


];