import classNames from 'classnames'
import { AnimatePresence } from 'framer-motion'
import React, { Suspense } from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import PageAnimate from '../components/Animation/PageAnimate'
import NoAuth from './NoAuth'
import { authRoutes } from './RouteList'

const AuthRoutes = (props) => {

    const { match } = props;

    const lockScreenAuth = useRouteMatch("/auth/lock-screen");

    return (
        <>
            <AnimatePresence>
                <Suspense
                    fallback={
                        <div className="preloader-it">
                            <div className="loader-pendulums" />
                        </div>
                    }>
                    <div className={classNames("hk-wrapper hk-pg-auth", { "bg-primary-dark-3": lockScreenAuth })} data-footer="simple" >
                        <Switch>

                            {
                                authRoutes.map((obj, i) => {
                                    return (obj.component) ? (
                                        <Route
                                            key={i}
                                            exact={obj.exact}
                                            path={match.path + obj.path}
                                            render={matchProps => (
                                                <NoAuth>
                                                    <PageAnimate>
                                                        <obj.component {...matchProps} />
                                                    </PageAnimate>

                                                </NoAuth>
                                            )}
                                        />) : (null)
                                })
                            }
                            <Route path="*">
                                <Redirect to="/error-404" />
                            </Route>
                        </Switch>
                    </div>
                </Suspense>
            </AnimatePresence>
        </>
    )
}

export default AuthRoutes
