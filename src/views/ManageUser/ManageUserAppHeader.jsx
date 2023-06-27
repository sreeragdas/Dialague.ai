import React, { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-feather";
import { connect } from "react-redux";
import { toggleTopNav } from "../../redux/action/Theme";
import HkTooltip from "../../components/@hk-tooltip/HkTooltip";
import UserForm from "./UserForm";
import { authorizeDoAction } from "../../utils/common-util";

const ADD_PERMISSIONS = "add_customuser";

const ManageUserAppHeader = ({ topNavCollapsed, toggleTopNav }) => {
  const [addNewUser, setAddNewUser] = useState(false);

  return (
    <>
      <header className="contact-header">
        <div className="d-flex align-items-center">
          <Dropdown>
            <div className="contactapp-title link-dark">
              <h1>Manage User</h1>
            </div>
          </Dropdown>
        </div>
        <div className="contact-options-wrap">
          {authorizeDoAction(ADD_PERMISSIONS) && (
            <div className="ms-3">
              <Button
                onClick={() => setAddNewUser(true)}
                size="sm"
                variant="outline-secondary"
                className="flex-shrink-0 d-lg-inline-block d-none"
              >
                <span>Create new User</span>
              </Button>
            </div>
          )}
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
      {authorizeDoAction(ADD_PERMISSIONS) && addNewUser && (
        <UserForm show={addNewUser} close={() => setAddNewUser(!addNewUser)} />
      )}
    </>
  );
};

const mapStateToProps = ({ theme }) => {
  const { topNavCollapsed } = theme;
  return { topNavCollapsed };
};

export default connect(mapStateToProps, { toggleTopNav })(ManageUserAppHeader);
