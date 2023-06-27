import React, { useEffect } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { toggleCollapsedNav } from '../../../redux/action/Theme';
import PageFooter from '../../Footer/PageFooter';
import TopNav from '../../Header/TopNav';
import Sidebar from '../../Sidebar/Sidebar';
import { useWindowWidth } from '@react-hook/window-size';

const LayoutClassic = ({ children, navCollapsed, topNavCollapsed, toggleCollapsedNav, maximize }) => {


    const appRoutes = useRouteMatch('/apps/');
    const errro404Route = useRouteMatch('/error-404');
    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (windowWidth <= 1199) {
            toggleCollapsedNav(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowWidth])


    return (
        <div
            className={classNames("hk-wrapper", { "hk-pg-auth": errro404Route }, { "hk__email__backdrop": maximize })}
            data-layout="vertical"
            data-layout-style={navCollapsed ? "collapsed" : "default"}
            data-navbar-style={topNavCollapsed ? "collapsed" : ""}
            data-menu="light"
            data-footer="simple"
            data-hover={navCollapsed ? "active" : ""}
        >
            {/* Top Navbar */}
            <TopNav />
            {/* Vertical Nav */}
            <Sidebar />
            <div className={classNames("hk-pg-wrapper", { "pb-0": appRoutes })}>
                {children}
                {!appRoutes && <PageFooter />}
            </div>
        </div>
    )
}

const mapStateToProps = ({ theme, emailReducer }) => {
    const { navCollapsed, topNavCollapsed } = theme;
    const { maximize } = emailReducer
    return { navCollapsed, topNavCollapsed, maximize }
};

export default connect(mapStateToProps, { toggleCollapsedNav })(LayoutClassic)
