import React, { useState, useEffect } from "react";
import SimpleBar from "simplebar-react";
import { Button, Col, Form, Pagination, Row } from "react-bootstrap";
import { Trash } from "react-feather";
import { orderBy } from "lodash";
import HkProgressBar from "../../../components/@hk-progressbar/HkProgressBar";
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
import {
  convertFileSize,
  formatDate,
  extractFileExtension,
} from "../../../utils/common-util";
import HkTooltip from "../../../components/@hk-tooltip/HkTooltip";
import useUploadList from "../../../hooks/useUploadList";
import useDomainList from "../../../hooks/useDomainList";
import useSubDomainList from "../../../hooks/useSubDomainList";
import { client } from "../../../axios";
import DeleteConfirmation from "../../../components/Modals/DeleteConfirmation";
import { authorizeDoAction } from "../../../utils/common-util";

const CHANGE_PERMISSIONS = "change_uploadedfiledetails";
const DELETE_PERMISSIONS = "delete_uploadedfiledetails";

const fileIconMap = {
  pdf: "ri-file-pdf-fill",
  docx: "ri-file-word-2-fill",
  doc: "ri-file-word-fill",
  xls: "ri-file-excel-2-fill",
  xlsx: "ri-file-excel-fill",
  ppt: "ri-file-ppt-fill",
  pptx: "ri-file-ppt-2-fill",
  txt: "ri-file-text-fill",
};

const statusProgressMap = {
  "file uploaded": "50",
  "index generated": "100",
};

const sortByFilters = [
  {
    value: "id",
    label: "- Select - ",
  },
  {
    value: "sub_domain",
    label: "Sub Domain",
  },
  {
    value: "status",
    label: "Status",
  },
  {
    value: "size",
    label: "File Size",
  },
  {
    value: "is_active",
    label: "Is Active",
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

const statusFilter = [
  {
    value: "",
    label: "- Select Status -",
  },
  {
    value: "file uploaded",
    label: "File Uploaded",
  },
  {
    value: "index generated",
    label: "Index Generated",
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
  status: "",
  domain: "",
  subDomain: "",
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

const ContactAppBody = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [selectedDeleteRow, setSelectedDeleteRow] = useState(null);
  const [options, setOptions] = useState(initObj);
  const [list] = useUploadList();
  const [filteredList, setFilteredList] = useState(list);
  const [domainList] = useDomainList(true);
  const [subDomainList] = useSubDomainList(true);

  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "domain",
      text: "Domain Name",
      sort: true,
      formatter: (cell, row) => (
        <>
          <div>
            <strong className="d-block">{cell?.name}</strong>
          </div>
          <div>{row?.sub_domain?.name || "-"}</div>
          <div className={`text-${row.is_active ? "success" : "warning"}`}>
            {row.is_active ? "Active" : "Not Active"}
          </div>
        </>
      ),
      sortCaret: customCaret,
      sortValue: (cell) => cell?.name,
      headerSortingClasses,
    },
    {
      dataField: "file_name",
      text: "File Name",
      sort: true,
      formatter: (cell, row) => {
        return (
          <>
            <div className="media fmapp-info-trigger">
              <div className="media-head me-3">
                <div className="avatar avatar-icon avatar-lg avatar-soft-warning">
                  <span className="initial-wrap">
                    <i className={fileIconMap[extractFileExtension(cell)]}></i>
                  </span>
                </div>
              </div>
              <div className="media-body manage-data-file">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="file-name">{cell}</div>
                  <div className="text-primary">
                    {convertFileSize(row?.size)}
                  </div>
                </div>

                <HkProgressBar.Wrapper>
                  <HkProgressBar.Label className="mb-0">
                    <span>{row?.status}</span>
                  </HkProgressBar.Label>
                  <div className="d-flex align-items-center">
                    <HkProgressBar
                      now={statusProgressMap[row?.status]}
                      variant="blue-dark-3"
                      rounded
                      size="xs"
                      className="flex-1"
                    />
                    <div className="fs-8 mnw-30p ms-3">
                      {statusProgressMap[row?.status]}%
                    </div>
                  </div>
                  <div className="text-primary">{row?.index_name}</div>
                </HkProgressBar.Wrapper>
              </div>
            </div>
          </>
        );
      },
      sortCaret: customCaret,
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

  const actionFormater = (row) => {
    return (
      <div className="d-flex align-items-center">
        <div className="d-flex">
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
    return client.delete(`/upload/${selectedDeleteRow.id}/`);
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
      if (filters.sortByColumn === "sub_domain") {
        newList = orderBy(
          newList,
          ["sub_domain.name"],
          [filters.orderByColumn]
        );
      } else {
        newList = orderBy(
          newList,
          [filters.sortByColumn],
          [filters.orderByColumn]
        );
      }
    }

    if (filters.status !== "") {
      newList = newList.filter((item) => {
        return item.status === filters.status;
      });
    }

    if (filters.domain !== "") {
      newList = newList.filter((item) => {
        return item.domain && item.domain.id === filters.domain;
      });
    }

    if (filters.subDomain !== "") {
      newList = newList.filter((item) => {
        return item.sub_domain && item.sub_domain.id === filters.subDomain;
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

        {selectedDeleteRow && (
          <DeleteConfirmation
            onConfirm={onConfirmDelete}
            onCancel={onCancelDelete}
            warningMessage={`You are about to permanently delete the below file - ${selectedDeleteRow.file_name}`}
            successMessage={`Your file - ${selectedDeleteRow.file_name} has been deleted successfully.`}
          />
        )}

        <div className="contact-list-view">
          <ToolkitProvider
            keyField="id"
            columns={columns}
            data={filteredList}
            search
            onSearch={(e) => console.log(e)}
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
                                Status :
                              </label>
                              <Form.Select
                                size="sm"
                                className="w-160p"
                                value={filters.status}
                                onChange={(e) =>
                                  setFilters({
                                    ...filters,
                                    status: e.target.value,
                                  })
                                }
                              >
                                {statusFilter.map((option) => (
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

                            <Form.Group className="d-xxl-flex d-none align-items-center mb-0">
                              <label className="flex-shrink-0 mb-0 me-2">
                                Sub Domain :
                              </label>
                              <Form.Select
                                size="sm"
                                className="w-180p"
                                value={filters.subDomain}
                                onChange={(e) =>
                                  setFilters({
                                    ...filters,
                                    subDomain: e.target.value,
                                  })
                                }
                              >
                                {subDomainList.map((domain) => (
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
                              <i className="ri-arrow-left-s-line" />
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
                              <i className="ri-arrow-right-s-line" />
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

export default ContactAppBody;
