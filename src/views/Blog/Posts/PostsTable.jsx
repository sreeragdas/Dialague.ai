import React from 'react';
import classNames from 'classnames';
import { Button, Col, Form, Pagination, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//Bootstrap Table Library
import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import paginationFactory, { PaginationProvider, PaginationTotalStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { columns, data } from './TableData';

const PostsTable = () => {

    //Table search
    const { SearchBar } = Search;

    const defaultSorted = [{
        dataField: 'title',
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
            <Form.Check type={mode} className="fs-6 mb-0" ref={(input) => {
                if (input) input.indeterminate = false;
            }} {...rest} readOnly />
        ),
        selectionRenderer: ({ mode, checked }) => (
            <Form.Check type={mode} checked={checked} readOnly />
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
        paginationSize: 10,
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
        <>
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
                                                <div className="blog-toolbar-left">
                                                    <Form.Group className="d-xxl-flex d-none align-items-center mb-0">
                                                        <Form.Select size='sm' className="w-120p">
                                                            <option value={1} >Bulk actions</option>
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
                                                <div className="blog-toolbar-right">
                                                    <div className="dataTables_filter">
                                                        <label>
                                                            <Form.Control as={SearchBar} {...props.searchProps} size="sm" type="search" placeholder="Search" />
                                                        </label>
                                                    </div>
                                                    <div className="dataTables_paginate paging_simple_numbers" id="datable_1_paginate">
                                                        <ul className="pagination custom-pagination pagination-simple m-0">
                                                            <li className={classNames("paginate_button page-item previous", { "disabled": paginationProps.page === 1 })} id="datable_1_previous">
                                                                <Link to="#" className="page-link" onClick={handlePrevPage(paginationProps)} >
                                                                    <i className="ri-arrow-left-s-line" />
                                                                </Link>
                                                            </li>
                                                            <li className={classNames("paginate_button page-item next", { "disabled": paginationProps.page >= paginationProps.dataSize / paginationProps.paginationSize })} id="datable_1_next">
                                                                <Link to="#" className="page-link" onClick={handleNextPage(paginationProps)} >
                                                                    <i className="ri-arrow-right-s-line" />
                                                                </Link>
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
                                                    <Pagination.Next onClick={handleNextPage(paginationProps)} disabled={paginationProps.page >= paginationProps.dataSize / paginationProps.paginationSize} > <i className="ri-arrow-right-s-line" /> </Pagination.Next>
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
        </>
    )
}

export default PostsTable
