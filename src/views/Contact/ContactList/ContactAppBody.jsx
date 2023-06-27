import React from 'react';
import SimpleBar from 'simplebar-react';
import { Button, Col, Form, Pagination, Row } from 'react-bootstrap';
import { Star } from 'react-feather';
//Bootstrap Table Library
import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import paginationFactory, { PaginationProvider, PaginationTotalStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
//Table data 
import { columns, data } from '../../TableData';


//Table search
const { SearchBar } = Search;

const ContactAppBody = () => {

    const defaultSorted = [{
        dataField: 'id',
        order: 'asc'
    }];

    //Custom Total layout
    const customTotal = (from, to, size) => (
        <span className="ms-2">
            {from} - {to} of {size}
        </span>
    );

    //Custom Select Box
    const selectRow = {
        mode: 'checkbox',
        selectionHeaderRenderer: ({ mode, indeterminate, ...rest }) => (
            <Form.Check
                type={mode}
                className="fs-6 mb-0"
                ref={(input) => {
                    if (input) input.indeterminate = false;
                }}
                {...rest}
                readOnly
            />
        ),
        selectionRenderer: ({ mode, checked }) => (
            <div className="d-flex align-items-center">
                <Form.Check type={mode} checked={checked} readOnly />
                <span className="contact-star" >
                    <span className="feather-icon">
                        <Star />
                    </span>
                </span>
            </div>
        ),
        style: { backgroundColor: '#ebf5f5', color: "black" }

    };

    //Options for Table Paginations
    const handleNextPage = ({
        page,
        onPageChange
    }) => () => {
        onPageChange(page + 1);
    }

    const handlePrevPage = ({
        page,
        onPageChange
    }) => () => {
        onPageChange(page - 1);
    }
    const options = {
        custom: true,
        paginationSize: 4,
        pageStartIndex: 1,
        withFirstAndLast: false,
        sizePerPage: 10,
        hideSizePerPage: true,
        hidePageListOnlyOnePage: true,
        showTotal: true,
        paginationTotalRenderer: customTotal,
        disablePageTitle: true,
        totalSize: columns.length
    };


    return (
        <div className="contact-body">
            <SimpleBar className="nicescroll-bar">
                <div className="collapse" id="collapseQuick">
                    <div className="quick-access-form-wrap">
                        <Form className="quick-access-form border">
                            <Row className="gx-3">
                                <Col xxl={10}>
                                    <div className="position-relative">
                                        <div className="dropify-square">
                                            <input type="file" className="dropify-1" />
                                        </div>
                                        <Col md={12}>
                                            <Row className="gx-3">
                                                <Col lg={4}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Control placeholder="First name*" type="text" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Control placeholder="Last name*" type="text" />
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={4}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Control placeholder="Email Id*" type="text" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Control placeholder="Phone" type="text" />
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={4}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Control placeholder="Department" type="text" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Select id="input_tags" multiple >
                                                            <option value={1}>Collaborator</option>
                                                            <option value={2} >Designer</option>
                                                            <option value={3}>Developer</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </div>
                                </Col>
                                <Col xxl={2}>
                                    <Form.Group className="mb-3">
                                        <Button variant="primary" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" className="btn-block">Create New
                                        </Button>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Button variant="secondary" data-bs-toggle="collapse" disabled data-bs-target="#collapseExample" aria-expanded="false" className="btn-block">Discard
                                        </Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div className="contact-list-view">
                    <ToolkitProvider
                        keyField="id"
                        columns={columns}
                        data={data}
                        search
                    >
                        {props => (
                            <>

                                <PaginationProvider
                                    pagination={paginationFactory(options)}
                                >
                                    {
                                        ({
                                            paginationProps,
                                            paginationTableProps
                                        }) => (
                                            <>
                                                <Row className="mb-3" >
                                                    <Col xs={7} mb={3}>
                                                        <div className="contact-toolbar-left">
                                                            <Form.Group className="d-xxl-flex d-none align-items-center mb-0">
                                                                <Form.Select size='sm' className="w-120p">
                                                                    <option value={1}>Bulk actions</option>
                                                                    <option value={2}>Edit</option>
                                                                    <option value={3}>Move to trash</option>
                                                                </Form.Select>
                                                                <Button size="sm" variant="light" className="ms-2">Apply</Button>
                                                            </Form.Group>
                                                            <Form.Group className="d-xxl-flex d-none align-items-center mb-0">
                                                                <label className="flex-shrink-0 mb-0 me-2">Sort by:</label>
                                                                <Form.Select size='sm' className="w-130p">
                                                                    <option value={1}>Date Created</option>
                                                                    <option value={2}>Date Edited</option>
                                                                    <option value={3}>Frequent Contacts</option>
                                                                    <option value={4}>Recently Added</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                            <Form.Select size="sm" className="d-flex align-items-center w-130p">
                                                                <option value={1}>Export to CSV</option>
                                                                <option value={2}>Export to PDF</option>
                                                                <option value={3}>Send Message</option>
                                                                <option value={4}>Delegate Access</option>
                                                            </Form.Select>
                                                        </div>
                                                    </Col>
                                                    <Col xs={5} mb={3}>
                                                        <div className="contact-toolbar-right">
                                                            <div className="dataTables_filter">
                                                                <Form.Label>
                                                                    <Form.Control as={SearchBar} {...props.searchProps} size="sm" type="search" placeholder="Search" />
                                                                </Form.Label>
                                                            </div>
                                                            <div className="dataTables_paginate paging_simple_numbers" id="datable_1_paginate">
                                                                <ul className="pagination custom-pagination pagination-simple m-0">
                                                                    <li className="paginate_button page-item previous disabled" id="datable_1_previous">
                                                                        <a href="#some" data-dt-idx={0} tabIndex={0} className="page-link">
                                                                            <i className="ri-arrow-left-s-line" />
                                                                        </a>
                                                                    </li>
                                                                    <li className="paginate_button page-item active">
                                                                        <a href="#some" data-dt-idx={1} tabIndex={0} className="page-link">1</a>
                                                                    </li>
                                                                    <li className="paginate_button page-item ">
                                                                        <a href="#some" data-dt-idx={2} tabIndex={0} className="page-link">2</a>
                                                                    </li>
                                                                    <li className="paginate_button page-item next" id="datable_1_next">
                                                                        <a href="#some" data-dt-idx={3} tabIndex={0} className="page-link">
                                                                            <i className="ri-arrow-right-s-line" />
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <BootstrapTable
                                                    keyField='id'
                                                    data={data}
                                                    columns={columns}
                                                    selectRow={selectRow}
                                                    bordered={false}
                                                    wrapperClasses="table-responsive"
                                                    classes="nowrap w-100 mb-5"
                                                    {...paginationTableProps}
                                                    defaultSorted={defaultSorted}
                                                    {...props.baseProps}
                                                />

                                                <Row>
                                                    <Col>
                                                        <PaginationTotalStandalone
                                                            {...paginationProps}
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Pagination className='custom-pagination pagination-simple d-flex justify-content-end'>
                                                            <Pagination.Prev onClick={handlePrevPage(paginationProps)} disabled={paginationProps.page === 1} > <i className="ri-arrow-left-s-line" /> </Pagination.Prev>
                                                            <Pagination.Item active>{paginationProps.page}</Pagination.Item>
                                                            <Pagination.Next onClick={handleNextPage(paginationProps)} disabled={paginationProps.page >= data.length / paginationProps.sizePerPage} > <i className="ri-arrow-right-s-line" /> </Pagination.Next>
                                                        </Pagination>
                                                    </Col>
                                                </Row>
                                            </>
                                        )
                                    }
                                </PaginationProvider>


                            </>
                        )}
                    </ToolkitProvider>
                </div>
            </SimpleBar>
        </div>
    )
}

export default ContactAppBody
