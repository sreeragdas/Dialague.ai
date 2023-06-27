import React from "react";
import { connect } from "react-redux";
import { toggleCollapsedNav } from "../../redux/action/Theme";
import { Link } from "react-router-dom";
//Images
import logo from "../../assets/dist/img/KD-1-icon.png";
import jampackImg from "../../assets/dist/img/KWELL-TEXT-PhotoRoom.png";
import { ArrowBarToLeft } from "tabler-icons-react";
import { Button } from "react-bootstrap";

const SidebarHeader = ({ navCollapsed, toggleCollapsedNav }) => {
  const toggleSidebar = () => {
    toggleCollapsedNav(!navCollapsed);
    document.getElementById("tggl-btn").blur();
  };
  return (
    <div className="menu-header">
      <span>
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center"
          to="/"
        >
          <img className="brand-img img-fluid" src={logo} alt="brand" />
          {/* <img className="brand-img img-fluid" src={jampackImg} alt="brand" /> */}
          <span className="text-black" style={{ marginLeft: "19.5px" }}>
            KVELL DYNAMICS
          </span>
        </Link>
        <Button
          id="tggl-btn"
          variant="flush-dark"
          style={{ marginLeft: "-10px" }}
          onClick={toggleSidebar}
          className="btn-icon btn-rounded flush-soft-hover navbar-toggle"
        >
          <span className="icon">
            <span className="svg-icon fs-5">
              <ArrowBarToLeft />
            </span>
          </span>
        </Button>
      </span>
    </div>
  );
};

const mapStateToProps = ({ theme }) => {
  const { navCollapsed } = theme;
  return { navCollapsed };
};

export default connect(mapStateToProps, { toggleCollapsedNav })(SidebarHeader);
