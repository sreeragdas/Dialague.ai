import React from "react";
import ManageUserAppHeader from "../ManageUserAppHeader";
import ManageUserAppBody from "./ManageUserAppBody";

const ManageUserList = () => {
  return (
    <div className="hk-pg-body py-0">
      <div
        className="contactapp-wrap contactapp-sidebar-toggle"
        id="manage-user"
      >
        <div className="contactapp-detail-wrap">
          <ManageUserAppHeader />
          <ManageUserAppBody />
        </div>
      </div>
    </div>
  );
};

export default ManageUserList;
