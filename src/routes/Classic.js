import { AnimatePresence } from 'framer-motion'
import React, { Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import PageAnimate from '../components/Animation/PageAnimate'
import LayoutClassic from '../layout/MainLayout/ClassicLayout'
import RequireAuth from './RequireAuth'
import { routes } from './RouteList'

const ClassicRoutes = (props) => {
    const { match } = props;

    return (
        <>
            <AnimatePresence>
                <Suspense
                    fallback={
                        <div className="preloader-it">
                            <div className="loader-pendulums" />
                        </div>
                    }>
                    <LayoutClassic>
                        <Switch>
                            {
                                routes.map((obj, i) => {
                                    return (obj.component) ? (
                                        <Route
                                            key={i}
                                            exact={obj.exact}
                                            path={match.path + obj.path}
                                            render={matchProps => (
                                                <RequireAuth>
                                                    <PageAnimate>
                                                        <obj.component {...matchProps} />
                                                    </PageAnimate>

                                                </RequireAuth>
                                            )}
                                        />) : (null)
                                })
                            }
                            <Route path="*">
                                <Redirect to="/error-404" />
                            </Route>
                        </Switch>
                    </LayoutClassic>
                </Suspense>
            </AnimatePresence>
        </>
    )
}

export default ClassicRoutes
