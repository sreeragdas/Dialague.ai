import React from 'react';
import { Button, ButtonGroup, Card, Col, Form, Pagination, Row } from 'react-bootstrap';
//Bootstrap Table Library
import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import paginationFactory, { PaginationProvider, PaginationTotalStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { Plus, Upload } from 'react-feather';
import HkBadge from '../../components/@hk-badge/@hk-badge';
//Table Data
import { columns, data } from './TableData';
//Table search
const { SearchBar } = Search;


const CustomerTable = () => {

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
        selectionHeaderRenderer: ({ mode, indeterminate, ...rest }) => {
            // console.log(rest);
            return (
                <Form.Check type={mode} className="fs-6 mb-0" ref={(input) => {
                    if (input) input.indeterminate = false;
                }} {...rest} readOnly />
            )
        },
        selectionRenderer: ({ mode, checked }) => {
            // console.log(rest);
            return <Form.Check type={mode} checked={checked} readOnly />
        },
        style: { backgroundColor: '#ebf5f5', color: "black" }
    };

    // Options for Table Paginations
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
        sizePerPage: 4,
        hideSizePerPage: true,
        hidePageListOnlyOnePage: true,
        showTotal: true,
        paginationTotalRenderer: customTotal,
        disablePageTitle: true,
        totalSize: columns.length
    };

    //CustomToggleBar
    const CustomToggleList = ({
        columns,
        onColumnToggle,
        toggles
    }) => (
        <div className="d-xxl-flex d-none align-items-center">
            <ButtonGroup size="sm">
                <Button variant="outline-light">View all</Button>
                <Button variant="outline-light">Monitored</Button>
                <Button variant="outline-light">Unmonitored</Button>
            </ButtonGroup>
        </div>
    );

    return (
        <Card className="card-border mb-0 h-100">
            <Card.Header className="card-header-action">
                <h6>New Customers
                    <HkBadge bg="light" size="sm" text="dark" className="ms-1">240</HkBadge>
                </h6>
                <div className="card-action-wrap">
                    <Button variant="outline-light" size="sm">
                        <span>
                            <span className="icon">
                                <span className="feather-icon">
                                    <Upload />
                                </span>
                            </span>
                            <span className="btn-text">import</span>
                        </span>
                    </Button>
                    <Button variant="primary" size="sm" className="ms-3">
                        <span>
                            <span className="icon">
                                <span className="feather-icon">
                                    <Plus />
                                </span>
                            </span>
                            <span className="btn-text">Add new</span>
                        </span>
                    </Button>
                </div>
            </Card.Header>
            <Card.Body>
                <div className="contact-list-view">
                    <ToolkitProvider
                        keyField="id"
                        columns={columns}
                        data={data}
                        search
                        columnToggle
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
                                                    <Col sm={8} >
                                                        <CustomToggleList {...props.columnToggleProps} />
                                                    </Col>
                                                    <Col sm={4} className="text-right d-flex justify-content-end">
                                                        <SearchBar {...props.searchProps} className="form-control form-control-sm" type="search" />
                                                        <Button variant="outline-light" size="sm" className="ms-3">
                                                            <span><span className="icon">
                                                                <i className="bi bi-filter"></i>
                                                            </span>
                                                                <span className="btn-text">Filters</span></span>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <BootstrapTable
                                                    keyField='id'
                                                    data={data}
                                                    columns={columns}
                                                    selectRow={selectRow}
                                                    bordered={false}
                                                    classes="dataTable display pb-30"
                                                    wrapperClasses="table-responsive scrollable-able"
                                                    // pagination={paginationFactory(options)}
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
                                                        <Pagination className='custom-pagination pagination-simple pagination-sm d-flex justify-content-end'>
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
                </div>
            </Card.Body>
        </Card>
    )
}

export default CustomerTable
