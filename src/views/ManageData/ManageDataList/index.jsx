import React from "react";
import ManageDataAppHeader from "../ManageDataAppHeader";
import ManageDataAppBody from "./ManageDataAppBody";

const ManageDataList = () => {
  return (
    <div className="hk-pg-body py-0">
      <div
        className="contactapp-wrap contactapp-sidebar-toggle"
        id="manage-data"
      >
        <div className="contactapp-detail-wrap">
          <ManageDataAppHeader />
          <ManageDataAppBody />
        </div>
      </div>
    </div>
  );
};

export default ManageDataList;
