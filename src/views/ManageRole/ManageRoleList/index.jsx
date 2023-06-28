import React from "react";
import ManageRoleAppHeader from "../ManageRoleAppHeader";
import ManageRoleAppBody from "./ManageRoleAppBody";


const ManageRoleList = () => {
  return (
    <div className="hk-pg-body py-0">
      <div
        className="contactapp-wrap contactapp-sidebar-toggle"
        id="manage-domain"
      >
        <div className="">
          <div className="contactapp-detail-wrap">
            {/* <ManageDomainAppHeader />
          
            <ManageDomainAppBody /> */}
            <ManageRoleAppHeader />
            <ManageRoleAppBody />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRoleList;
