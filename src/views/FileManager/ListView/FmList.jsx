import React from 'react';
import { Form, Nav, Tab, } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { Star } from 'react-feather';
//Bootstrap Table Library
import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
//Table data 
import { data, columns } from './TableData';



const FmList = ({ toggleInfo }) => {


    const defaultSorted = [{
        dataField: 'name',
        order: 'asc'
    }];


    //Custom Select Box
    const selectRow = {
        mode: 'checkbox',
        selectionHeaderRenderer: ({ mode, indeterminate, ...rest }) => (
            <Form.Check type={mode} className="fs-6 mb-0" ref={(input) => {
                if (input) input.indeterminate = false;
            }} {...rest} readOnly />
        ),
        selectionRenderer: ({ mode, checked }) => (
            // <Form.Check type={mode} {...rest} />
            <div className="d-flex align-items-center">
                <Form.Check type={mode} checked={checked} readOnly />
                <span className="file-star" >
                    <span className="feather-icon">
                        <Star />
                    </span>
                </span>
            </div>
        ),
        style: { backgroundColor: '#ebf5f5', color: "black" }

    };


    return (
        <div className="fm-body">
            <SimpleBar className="nicescroll-bar">
                <div className="file-list-view">
                    <Tab.Container defaultActiveKey="cloud_doc" >
                        <Nav as="ul" variant="tabs" className="nav-line nav-icon nav-light">
                            <Nav.Item as="li">
                                <Nav.Link eventKey="cloud_doc">
                                    <span className="nav-link-text">Cloud Documents</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link>
                                    <span className="nav-link-text">Shared with me</span>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="cloud_doc">
                                <ToolkitProvider
                                    keyField="id"
                                    columns={columns}
                                    data={data}
                                    search
                                >
                                    {props => (
                                        <>
                                            <BootstrapTable
                                                keyField='id'
                                                data={data}
                                                columns={columns}
                                                selectRow={selectRow}
                                                bordered={false}
                                                wrapperClasses="table-responsive"
                                                classes="nowrap w-100 mb-5"
                                                defaultSorted={defaultSorted}
                                                {...props.baseProps}
                                            />
                                        </>
                                    )}
                                </ToolkitProvider>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </SimpleBar>
        </div>
    )
}

export default FmList
