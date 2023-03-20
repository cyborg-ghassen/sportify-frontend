import {Fragment, Suspense, useEffect} from "react";

// Motion
import {motion} from 'framer-motion/dist/framer-motion';

// Redux
import {useDispatch, useSelector} from "react-redux";
import {theme} from "../redux/customise/customiseActions";

// Router
import {
    BrowserRouter, Redirect,
    Route,
    Switch,
    useHistory,
} from "react-router-dom";

// Routes
import {Routes} from "./routes";

// Layouts
import VerticalLayout from "../layout/VerticalLayout";
import HorizontalLayout from "../layout/HorizontalLayout";
import FullLayout from "../layout/FullLayout";

// Components
import useToken from "../view/pages/authentication-modern/useToken";
import Login from "../view/pages/auth/login";
import SignUp from "../view/pages/auth/register";
import {Alert} from "antd";
import {usePermissions} from "../PermissionContext";

export default function Router() {
    const {token, setToken} = useToken();
    const {permissions, groups} = usePermissions();

    if (!permissions || !groups) return null;

    // Redux
    const customise = useSelector(state => state.customise)
    const dispatch = useDispatch()

    // Location
    const location = useHistory()

    const isAuthenticated = !!token;

    // Dark Mode
    let themeLocal

    useEffect(() => {
    }, [permissions, groups]);

    useEffect(() => {
        if (localStorage) {
            themeLocal = localStorage.getItem("theme")
        }

        if (themeLocal === "light" || themeLocal === "dark") {
            document.querySelector("body").classList.add(themeLocal)
            dispatch(theme(themeLocal))
        } else {
            document.querySelector("body").classList.add(customise.theme)
            dispatch(theme(customise.theme))
        }
    }, [])

    // RTL
    useEffect(() => {
        if (customise.direction === "ltr") {
            document.querySelector("html").setAttribute("dir", "ltr");
        } else if (customise.direction === "rtl") {
            document.querySelector("html").setAttribute("dir", "rtl");
        }
    }, [])

    // Url Check
    useEffect(() => {
        // Theme
        if (location.location.search === "?theme=dark") {
            localStorage.setItem("theme", "dark")
            themeLocal = "dark"
        } else if (location.location.search === "?theme=light") {
            localStorage.setItem("theme", "light")
            themeLocal = "light"
        }

        // Direction
        if (location.location.search === "?direction=ltr") {
            document.querySelector("html").setAttribute("dir", "ltr");
        } else if (location.location.search === "?direction=rtl") {
            document.querySelector("html").setAttribute("dir", "rtl");
        }
    }, [])

    // Default Layout
    const DefaultLayout = customise.layout; // FullLayout or VerticalLayout

    // All the available layouts
    const Layouts = {VerticalLayout, HorizontalLayout, FullLayout};

    // Return Filtered Array of Routes & Paths
    const LayoutRoutesAndPaths = (layout) => {
        const LayoutRoutes = [];
        const LayoutPaths = [];
        if (Routes) {
            // Checks if Route layout or Default layout matches current layout
            Routes.filter(route => (route.layout === layout) && (
                LayoutRoutes.push(route),
                    LayoutPaths.push(route.path)
            ));
        }
        return {LayoutRoutes, LayoutPaths};
    };
    const hasPerm = (name) => {
        return permissions ? permissions.some(item => name.includes(item)) : false
    };

    const hasGroup = (name) => {
        return groups ? groups.some(item => name.includes(item)) : false
    };

    // Return Route to Render
    const ResolveRoutes = () => {
        return Object.keys(Layouts).map((layout, index) => {
            const {LayoutRoutes, LayoutPaths} = LayoutRoutesAndPaths(layout);

            let LayoutTag;
            if (DefaultLayout === "HorizontalLayout") {
                if (layout === "VerticalLayout") {
                    LayoutTag = Layouts["HorizontalLayout"];
                } else {
                    LayoutTag = Layouts[layout];
                }
            } else {
                LayoutTag = Layouts[layout];
            }
            return (
                <Fragment key={index}>
                    <Switch>
                        <Route path={LayoutPaths} key={index}>
                            <LayoutTag>
                                <Switch>
                                    {LayoutRoutes.map((route, i) => {
                                        return (
                                            hasPerm(route.perm_name) || hasGroup(route.group_name) &&
                                            <Route
                                                key={i}
                                                path={route.path}
                                                exact={route.exact === true}
                                                render={(props) => {
                                                    return (
                                                        isAuthenticated ?
                                                            <Suspense fallback={null}>
                                                                {
                                                                    route.layout === 'FullLayout' ? (
                                                                        <route.component {...props} />
                                                                    ) : (
                                                                        <motion.div
                                                                            initial={{opacity: 0, y: 50}}
                                                                            animate={{opacity: 1, y: 0}}
                                                                            transition={{
                                                                                type: "spring",
                                                                                duration: 0.5,
                                                                                delay: 0.5
                                                                            }}
                                                                        >
                                                                            <route.component {...props} />
                                                                        </motion.div>
                                                                    )
                                                                }
                                                            </Suspense> :
                                                            <Redirect
                                                                to={{
                                                                    pathname: '/signin',
                                                                    state: {from: props.location}
                                                                }}/>
                                                    );
                                                }}
                                            />
                                        );
                                    })}
                                </Switch>
                            </LayoutTag>
                        </Route>

                        <Route path={"/signin"} key={"/signin"}>
                            <Login setToken={setToken}/>
                        </Route>
                        {/*<Route path={"/recover-password"} component={Recover} key={"/recover-password"}/>*/}
                        {/*<Route path={"/password/reset"} component={ResetPassword} key={"/password/reset"}/>*/}
                        <Route path={"/register"} key={"/register"}>
                            <SignUp setToken={setToken}/>
                        </Route>
                    </Switch>
                    <Alert key={"alert"}/>
                </Fragment>
            );
        });
    };

    return (
        <BrowserRouter>
            <Switch>
                {ResolveRoutes()}

                {/*/!* Home Page *!/*/}
                {/*<Route*/}
                {/*    exact*/}
                {/*    path={'/'}*/}
                {/*    render={() => {*/}
                {/*        return (*/}
                {/*            DefaultLayout === "HorizontalLayout" ? (*/}
                {/*                <Layouts.HorizontalLayout>*/}
                {/*                    <Analytics/>*/}
                {/*                </Layouts.HorizontalLayout>*/}
                {/*            ) : (*/}
                {/*                <Layouts.VerticalLayout>*/}
                {/*                    <Analytics/>*/}
                {/*                </Layouts.VerticalLayout>*/}
                {/*            )*/}
                {/*        )*/}
                {/*    }}*/}
                {/*/>*/}

                {/*/!* NotFound *!/*/}
                {/*<Route path='*'>*/}
                {/*    <Error404/>*/}
                {/*</Route>*/}

            </Switch>
        </BrowserRouter>
    );
};