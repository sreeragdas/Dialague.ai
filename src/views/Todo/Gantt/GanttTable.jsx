import React from 'react'
import { Form } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { columns, data } from './GanttData';


const GanttTable = () => {

    const defaultSorted = [{
        dataField: 'task',
        order: 'asc'
    }];

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
            <Form.Check type={mode} checked={checked} readOnly />
        ),
        style: { backgroundColor: '#ebf5f5', color: "black" }

    };

    return (
        <SimpleBar autoHide={false} style={{ maxHeight: "100vh" }} className="split">
            <ToolkitProvider
                keyField="id"
                columns={columns}
                data={data}
                search
            >
                {props => (
                    <BootstrapTable
                        keyField='id'
                        data={data}
                        columns={columns}
                        selectRow={selectRow}
                        bordered={false}
                        wrapperClasses="table-wrap"
                        classes="table-wrap  gt-todo-table nowrap"
                        // {...paginationTableProps}
                        defaultSorted={defaultSorted}
                        {...props.baseProps}
                    />

                )}
            </ToolkitProvider>
        </SimpleBar>
    )
}

export default GanttTable
