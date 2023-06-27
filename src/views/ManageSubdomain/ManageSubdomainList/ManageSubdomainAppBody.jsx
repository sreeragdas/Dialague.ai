import React, { useState, useEffect } from "react";
import SimpleBar from "simplebar-react";
import { Button, Col, Form, Pagination, Row } from "react-bootstrap";
import { Trash, Edit } from "react-feather";
import { orderBy } from "lodash";
//Bootstrap Table Library
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { customCaret, headerSortingClasses } from "../../TableData";
import { formatDate } from "../../../utils/common-util";
import HkTooltip from "../../../components/@hk-tooltip/HkTooltip";
import useDomainList from "../../../hooks/useDomainList";
import useSubDomainList from "../../../hooks/useSubDomainList";
import { client } from "../../../axios";
import DeleteConfirmation from "../../../components/Modals/DeleteConfirmation";
import { authorizeDoAction } from "../../../utils/common-util";
import CreateNewSuddomain from "../CreateNewSubdomain";

const CHANGE_PERMISSIONS = "change_subdomain";
const DELETE_PERMISSIONS = "delete_subdomain";

const sortByFilters = [
  {
    value: "id",
    label: "- Select - ",
  },
  {
    value: "updated_at",
    label: "Updated At",
  },
];

const orderByFilters = [
  {
    value: "asc",
    label: "Ascending",
  },
  {
    value: "desc",
    label: "Descending",
  },
];

//Table search
const { SearchBar } = Search;

//Custom Total layout
const customTotal = (from, to, size) => (
  <span className="ms-2">
    {from} - {to} of {size}
  </span>
);

const initialFilters = {
  sortByColumn: "updated_at",
  orderByColumn: "desc",
  domain: "",
};

const initObj = {
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
  totalSize: 0,
};

const initialSubdomain = {
  id: "",
  name: "",
  domain: "",
  description: "",
};

const ManageSubdomainAppBody = () => {
  const [showSubdomainForm, setShowSubdomainForm] = useState(false);
  const [selectedSubdomain, setSelectedSubdomain] = useState(initialSubdomain);
  const [filters, setFilters] = useState(initialFilters);
  const [selectedDeleteRow, setSelectedDeleteRow] = useState(null);
  const [options, setOptions] = useState(initObj);
  const [list] = useSubDomainList();
  const [filteredList, setFilteredList] = useState(list);
  const [domainList] = useDomainList(true);

  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      formatter: (cell) => <strong className="d-block">{cell}</strong>,
      sortCaret: customCaret,
      sort: true,
      headerSortingClasses,
    },
    {
      dataField: "domain",
      text: "Domain Name",
      sort: true,
      formatter: (cell) => <span className="d-block">{cell?.name}</span>,
      sortCaret: customCaret,
      sortValue: (cell) => cell?.name,
      headerSortingClasses,
    },
    {
      dataField: "description",
      text: "Description",
      formatter: (cell) => (
        <HkTooltip placement="top" title={cell}>
          <span className="text-truncate mw-150p d-block">{cell}</span>
        </HkTooltip>
      ),
      sort: true,
      sortCaret: customCaret,
      headerSortingClasses,
    },
    {
      dataField: "created_at",
      text: "Dates",
      sort: true,
      formatter: (cell, row) => (
        <>
          <div>
            <small className="text-primary">
              Created: <span>{formatDate(cell)}</span>
            </small>
          </div>
          <div>
            <small className="text-warning">
              Updated: <span>{formatDate(row.updated_at)}</span>
            </small>
          </div>
        </>
      ),
      sortCaret: customCaret,
      headerSortingClasses,
    },
    {
      dataField: "",
      text: "Actions",
      formatter: (cell, row) => actionFormater(row),
    },
  ];

  const handleEdit = (row) => {
    row.domain = row.domain.id;
    setSelectedSubdomain(row);
    setShowSubdomainForm(true);
  };

  const actionFormater = (row) => {
    return (
      <div className="d-flex align-items-center">
        <div className="d-flex">
          {authorizeDoAction(CHANGE_PERMISSIONS) && (
            <Button
              variant="flush-dark"
              onClick={() => handleEdit(row)}
              className="btn-icon btn-rounded flush-soft-hover"
              data-bs-toggle="tooltip"
              data-placement="top"
              data-bs-original-title="Edit"
            >
              <span className="icon">
                <span className="feather-icon">
                  <Edit />
                </span>
              </span>
            </Button>
          )}

          {authorizeDoAction(DELETE_PERMISSIONS) && (
            <Button
              variant="flush-dark"
              onClick={() => setSelectedDeleteRow(row)}
              className="btn-icon btn-rounded flush-soft-hover del-button"
              data-bs-toggle="tooltip"
              data-placement="top"
              data-bs-original-title="Delete"
            >
              <span className="icon">
                <span className="feather-icon">
                  <Trash />
                </span>
              </span>
            </Button>
          )}
        </div>
      </div>
    );
  };

  const onConfirmDelete = async () => {
    return client.delete(`/subdomains/${selectedDeleteRow.id}/`);
  };

  const onCancelDelete = () => {
    setSelectedDeleteRow(null);
  };

  //Options for Table Paginations
  const handleNextPage =
    ({ page, onPageChange }) =>
    () => {
      onPageChange(page + 1);
    };

  const handlePrevPage =
    ({ page, onPageChange }) =>
    () => {
      onPageChange(page - 1);
    };

  useEffect(() => {
    let newList = [...list];

    if (!newList.length) {
      return;
    }

    if (filters.sortByColumn !== "id") {
      newList = orderBy(
        newList,
        [filters.sortByColumn],
        [filters.orderByColumn]
      );
    }

    if (filters.domain !== "") {
      newList = newList.filter((item) => {
        return item.domain && item.domain.id === filters.domain;
      });
    }

    setFilteredList([...newList]);
    setOptions({
      ...options,
      totalSize: newList.length,
    });
  }, [list, filters]);

  return (
    <div className="contact-body">
      <SimpleBar className="nicescroll-bar">
        <div className="collapse" id="collapseQuick">
          <div className="quick-access-form-wrap"></div>
        </div>

        {authorizeDoAction(CHANGE_PERMISSIONS) && showSubdomainForm && (
          <CreateNewSuddomain
            show={showSubdomainForm}
            close={() => setShowSubdomainForm(!showSubdomainForm)}
            subdomainData={selectedSubdomain}
          />
        )}

        {authorizeDoAction(DELETE_PERMISSIONS) && selectedDeleteRow && (
          <DeleteConfirmation
            onConfirm={onConfirmDelete}
            onCancel={onCancelDelete}
            warningMessage={`You are about to permanently delete the below subdomain - ${selectedDeleteRow.name}`}
            successMessage={`Subdomain - ${selectedDeleteRow.name} has been deleted successfully.`}
          />
        )}

        <div className="contact-list-view">
          <ToolkitProvider
            keyField="id"
            columns={columns}
            data={filteredList}
            search
          >
            {(props) => (
              <>
                <PaginationProvider pagination={paginationFactory(options)}>
                  {({ paginationProps, paginationTableProps }) => (
                    <>
                      <Row className="mb-3">
                        <Col xs={12} mb={3}>
                          <div className="contact-toolbar-left">
                            <Form.Group className="d-xxl-flex d-none align-items-center mb-0">
                              <label className="flex-shrink-0 mb-0 me-2">
                                Sort by:
                              </label>
                              <Form.Select
                                size="sm"
                                className="w-130p"
                                value={filters.sortByColumn}
                                onChange={(e) =>
                                  setFilters({
                                    ...filters,
                                    sortByColumn: e.target.value,
                                  })
                                }
                              >
                                {sortByFilters.map((option) => (
                                  <option
                                    value={option?.value}
                                    key={option?.value}
                                  >
                                    {option?.label}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>

                            <Form.Group className="d-xxl-flex d-none align-items-center mb-0">
                              <label className="flex-shrink-0 mb-0 me-2">
                                Order by:
                              </label>
                              <Form.Select
                                size="sm"
                                className="w-130p"
                                value={filters.orderByColumn}
                                onChange={(e) =>
                                  setFilters({
                                    ...filters,
                                    orderByColumn: e.target.value,
                                  })
                                }
                              >
                                {orderByFilters.map((option) => (
                                  <option
                                    value={option?.value}
                                    key={option?.value}
                                  >
                                    {option?.label}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>

                            <Form.Group className="d-xxl-flex d-none align-items-center mb-0">
                              <label className="flex-shrink-0 mb-0 me-2">
                                Domain :
                              </label>
                              <Form.Select
                                size="sm"
                                className="w-200p"
                                value={filters.domain}
                                onChange={(e) =>
                                  setFilters({
                                    ...filters,
                                    domain: e.target.value,
                                  })
                                }
                              >
                                {domainList.map((domain) => (
                                  <option value={domain?.id} key={domain?.id}>
                                    {domain?.name}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>

                            <div className="d-xxl-flex d-none align-items-center mb-0">
                              <Button
                                onClick={() =>
                                  setFilters({ ...initialFilters })
                                }
                                size="sm"
                                variant="outline-secondary"
                                className="flex-shrink-0 d-lg-inline-block d-none"
                              >
                                <span>Reset</span>
                              </Button>
                            </div>

                            <Form.Group className="dataTables_filter d-xxl-flex d-none align-items-center mb-0">
                              <label className="flex-shrink-0 mb-0 me-2">
                                Search :
                              </label>
                              <Form.Control
                                as={SearchBar}
                                {...props.searchProps}
                                size="sm"
                                className="w-200p"
                                type="search"
                                placeholder="Search"
                              />
                            </Form.Group>
                          </div>
                        </Col>
                      </Row>

                      <BootstrapTable
                        keyField="id"
                        data={filteredList}
                        columns={columns}
                        selectRow={undefined}
                        bordered={false}
                        wrapperClasses="table-responsive"
                        classes="nowrap w-100 mb-5"
                        {...paginationTableProps}
                        defaultSorted={[
                          {
                            dataField: filters.sortByColumn,
                            order: filters.orderByColumn,
                          },
                        ]}
                        {...props.baseProps}
                      />

                      <Row>
                        <Col>
                          <PaginationTotalStandalone {...paginationProps} />
                        </Col>
                        <Col>
                          <Pagination className="custom-pagination pagination-simple d-flex justify-content-end">
                            <Pagination.Prev
                              onClick={handlePrevPage(paginationProps)}
                              disabled={paginationProps.page === 1}
                            >
                              <i className="ri-arrow-left-s-line" />{" "}
                            </Pagination.Prev>
                            <Pagination.Item active>
                              {paginationProps.page}
                            </Pagination.Item>
                            <Pagination.Next
                              onClick={handleNextPage(paginationProps)}
                              disabled={
                                paginationProps.page >=
                                filteredList.length /
                                  paginationProps.sizePerPage
                              }
                            >
                              <i className="ri-arrow-right-s-line" />{" "}
                            </Pagination.Next>
                          </Pagination>
                        </Col>
                      </Row>
                    </>
                  )}
                </PaginationProvider>
              </>
            )}
          </ToolkitProvider>
        </div>
      </SimpleBar>
    </div>
  );
};

export default ManageSubdomainAppBody;
