import React from "react";
import ManageSubdomainAppHeader from "../ManageSubdomainAppHeader";
import ManageSubdomainAppBody from "./ManageSubdomainAppBody";

const ManageSubdomainList = () => {
  return (
    <div className="hk-pg-body py-0">
      <div
        className="contactapp-wrap contactapp-sidebar-toggle"
        id="manage-subdomain"
      >
        <div className="">
          <div className="contactapp-detail-wrap">
            <ManageSubdomainAppHeader />
            <ManageSubdomainAppBody />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSubdomainList;
