import { MoreVertical } from 'react-feather';
import { ArrowsSort, SortAscending, SortDescending } from 'tabler-icons-react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

//Images
import avatar2 from '../../../assets/dist/img/avatar2.jpg';
import avatar3 from '../../../assets/dist/img/avatar3.jpg';
import avatar7 from '../../../assets/dist/img/avatar7.jpg';
import avatar8 from '../../../assets/dist/img/avatar8.jpg';
import avatar9 from '../../../assets/dist/img/avatar9.jpg';
import avatar10 from '../../../assets/dist/img/avatar10.jpg';
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


//Custom Author Formatter
const authorFormater = (cell) => {
    return (
        cell.map((data, indx) => (
            <div className="media align-items-center" key={indx} >
                <div className="media-head me-2">
                    <div className={classNames("avatar avatar-xs avatar-rounded", (data.initAvt ? `avatar-soft-${data.avtBg}` : ""))}>
                        {data.Img && <img src={data.Img} alt="user" className="avatar-img" />}
                        {data.initAvt && <span className="initial-wrap">{data.initAvt}</span>}
                    </div>
                </div>
                <div className="media-body">
                    <span className="d-block">{data.authorName}</span>
                </div>
            </div>
        ))
    )
}


//Custom Tag Container
const tagFormater = (cell) => {
    return (
        cell.map((data, indx) => (
            <HkBadge bg={data.bg} soft className="my-1  me-2" key={indx} >{data.title}</HkBadge>
        ))
    )
}

//Custom Seo Formatter
const seoFormater = (cell) => {
    return <HkBadge bg={cell} indicator className="badge-indicator-xl" />
}

//Custom Action Container
const actionFormater = (cell) => {
    return (
        cell.map((data, indx) => (
            <div className="d-flex align-items-center" key={indx} >
                <Dropdown>
                    <Dropdown.Toggle variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover no-caret">
                        <span className="icon">
                            <span className="feather-icon">
                                <MoreVertical />
                            </span>
                        </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                        <Dropdown.Item as={Link} to={data.actinLink} >Action</Dropdown.Item>
                        <Dropdown.Item>Another action</Dropdown.Item>
                        <Dropdown.Item>Something else here</Dropdown.Item>
                        <div className="dropdown-divider" />
                        <Dropdown.Item>Separated link</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        ))
    )
}


export const columns = [
    {
        dataField: "id",
        text: "ID",
    },
    {
        dataField: "title",
        text: "Title",
        sort: true,
        formatter: (cell) => <span className="text-truncate text-high-em" style={{ display: 'inline-block', width: 200, overflow: 'hidden', textOverflow: "ellipsis" }} >{cell}</span>,
        sortCaret: customCaret,
        headerSortingClasses,
    },
    {
        dataField: "author",
        text: "Author",
        sort: true,
        formatter: authorFormater,
        sortCaret: customCaret,
        sortValue: (cell, row) => (cell.map((data) => (data.authorName))),
        headerSortingClasses
    },
    {
        dataField: "categories",
        text: "Categories",
        sort: true,
        sortCaret: customCaret,
        headerSortingClasses
    },
    {
        dataField: "tags",
        text: "Tags",
        sort: true,
        formatter: tagFormater,
        sortCaret: customCaret,
        headerSortingClasses
    },
    {
        dataField: "status",
        text: "Status",
        sort: true,
        sortCaret: customCaret,
        headerSortingClasses
    },
    {
        dataField: "date",
        text: "Date",
        sort: true,
        sortCaret: customCaret,
        headerSortingClasses
    },
    {
        dataField: "seo",
        text: "SEO",
        sort: true,
        formatter: seoFormater,
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
        id: 110,
        title: "Building an effective Dashboard User Interface design",
        author: [{ Img: avatar2, authorName: "Morgan Freeman" }],
        categories: "design",
        tags: [{ title: "Promotion", bg: "violet" }, { title: "Collaborator", bg: "danger" }],
        status: "Published",
        date: "13 Jan, 2020",
        seo: "primary",
        actions: [{ actionLink: "#", }]
    },

    {
        id: 109,
        title: "Testing Post",
        author: [{ Img: avatar9, authorName: "Huma Therman" }],
        categories: "Development",
        tags: [{ title: "Collaborator", bg: "danger" }],
        status: "Draft",
        date: "13 Jan, 2020",
        seo: "light",
        actions: [{ actionLink: "#", }]
    },

    {
        id: 108,
        title: "Untitled Post",
        author: [{ initAvt: "C", avtBg: "success", authorName: "Charlie Chaplin" }],
        categories: "design",
        tags: [{ title: "Collaborator", bg: "danger" },],
        status: "Draft",
        date: "13 Jan, 2019",
        seo: "light",
        actions: [{ actionLink: "#", }]
    },

    {
        id: 106,
        title: "Remote Work &amp; Collaboration in Design",
        author: [{ Img: avatar10, authorName: "Winston Churcchil" }],
        categories: "design",
        tags: [{ title: "Promotion", bg: "violet" }, { title: "Advertisement", bg: "light" },],
        status: " Published",
        date: "13 Jan, 2020",
        seo: "danger",
        actions: [{ actionLink: "#", }]
    },
    {
        id: 105,
        title: "What are empty states in application?",
        author: [{ Img: avatar3, authorName: "Jaquiline Joker" }],
        categories: "design",
        tags: [{ title: "Promotion", bg: "violet" }, { title: "Collaborator", bg: "danger" },],
        status: " Published",
        date: "13 Jan, 2020",
        seo: "warning",
        actions: [{ actionLink: "#", }]
    },

    {
        id: 104,
        title: "How to keep your code simple and orderly that any developer can pick up easily?",
        author: [{ Img: avatar7, authorName: "Tom Cruz" }],
        categories: "Development",
        tags: [{ title: "Collaborator", bg: "danger" }, { title: "Angular Development", bg: "success" },],
        status: " Published",
        date: "13 Jan, 2020",
        seo: "primary",
        actions: [{ actionLink: "#", }]
    },
    {
        id: 107,
        title: "Untitled post",
        author: [{ initAvt: "D", avtBg: "danger", authorName: "Daniel Craig" }],
        categories: "design",
        tags: [{ title: "Collaborator", bg: "danger" }, { title: "Angular Development", bg: "success" },],
        status: " Draft",
        date: "13 Jan, 2020",
        seo: "light",
        actions: [{ actionLink: "#", }]
    },
    {
        id: 103,
        title: "Sass based solid core framework",
        author: [{ initAvt: "H", avtBg: "primary", authorName: "Hence work" }],
        categories: "User Interface",
        tags: [{ title: "Promotion", bg: "violet" },],
        status: " Draft",
        date: "13 Jan, 2020",
        seo: "light",
        actions: [{ actionLink: "#", }]
    },
    {
        id: 102,
        title: "Marvin - Bootstrap 4.5.0 Admin Dashboard template",
        author: [{ Img: avatar8, authorName: "Huma Therman" }],
        categories: "design",
        tags: [{ title: "Promotion", bg: "violet" },],
        status: " Published",
        date: "13 Jan, 2020",
        seo: "primary",
        actions: [{ actionLink: "#", }]
    },
    {
        id: 101,
        title: "Go miles away",
        author: [{ Img: avatar8, authorName: "Huma Therman" }],
        categories: "Business",
        tags: [{ title: "Promotion", bg: "violet" },],
        status: " Published",
        date: "13 Jan, 2020",
        seo: "primary",
        actions: [{ actionLink: "#", }]
    },

];