import React from "react";
import ManageOrganizationAppHeader from "../ManageOrganizationAppHeader";
import ManageOrganizationAppBody from "./ManageOrganizationAppBody";

const ManageOrganizationList = () => {
  return (
    <div className="hk-pg-body py-0">
      <div
        className="contactapp-wrap contactapp-sidebar-toggle"
        id="manage-organization"
      >
        <div className="">
          <div className="contactapp-detail-wrap">
            <ManageOrganizationAppHeader />
            <ManageOrganizationAppBody />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrganizationList;
