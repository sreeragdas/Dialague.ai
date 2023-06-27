import React from "react";

import Account from './Account'
import ManageAccountAppHeader from "./ManageAccountAppHeader";

const ManageAccount = () => {
  return (
    <div className="hk-pg-body py-0">
      <div
        className="contactapp-wrap contactapp-sidebar-toggle"
        id="manage-user"
      >
        <div className="contactapp-detail-wrap">
     
        <ManageAccountAppHeader />
        <Account />
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
