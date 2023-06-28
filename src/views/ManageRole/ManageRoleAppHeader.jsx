import React, { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-feather";
import { connect } from "react-redux";
import { toggleTopNav } from "../../redux/action/Theme";
import HkTooltip from "../../components/@hk-tooltip/HkTooltip";

import { authorizeDoAction } from "../../utils/common-util";
import CreateNewRole from "./CreateNewRole";

const ADD_PERMISSIONS = "add_organization";

const ManageRoleAppHeader = ({ topNavCollapsed, toggleTopNav }) => {
  const [addNewOrganization, setAddNewOrganization] = useState(false);

  return (
    <>
      <header className="contact-header">
        <div className="d-flex align-items-center">
          <Dropdown>
            <div className="contactapp-title link-dark">
              <h1>Manage Role</h1>
            </div>
          </Dropdown>
        </div>
        <div className="contact-options-wrap">

            <div className="ms-3">
              <Button
                onClick={() => setAddNewOrganization(true)}
                size="sm"
                variant="outline-secondary"
                className="flex-shrink-0 d-lg-inline-block d-none"
              >
                <span>Create Role</span>
              </Button>
            </div>
          
          <div className="v-separator d-lg-block d-none" />
          <Button
            as="a"
            href="#"
            className="btn-icon btn-flush-dark btn-rounded flush-soft-hover hk-navbar-togglable d-sm-inline-block d-none"
            onClick={() => toggleTopNav(!topNavCollapsed)}
          >
            <HkTooltip
              placement={topNavCollapsed ? "bottom" : "top"}
              title="Collapse"
            >
              <span className="icon">
                <span className="feather-icon">
                  {topNavCollapsed ? <ChevronDown /> : <ChevronUp />}
                </span>
              </span>
            </HkTooltip>
          </Button>
        </div>
      </header>
 
        <CreateNewRole
          show={addNewOrganization}
          close={() => setAddNewOrganization(!addNewOrganization)}
        />
      
    </>
  );
};

const mapStateToProps = ({ theme }) => {
  const { topNavCollapsed } = theme;
  return { topNavCollapsed };
};

export default connect(mapStateToProps, { toggleTopNav })(
    ManageRoleAppHeader
);
