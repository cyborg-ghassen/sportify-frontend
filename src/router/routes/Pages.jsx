import {lazy} from "react";

const PagesRoutes = [
    // MAIN
    {
        path: "/home",
        component: lazy(() => import("../../view/main/dashboard/analytics")),
        layout: "VerticalLayout",
        group_name: ["admin", "visitor"],
        perm_name: [""],
    },
    // ACCOUNT
    {
        path: "/user",
        component: lazy(() => import("../../view/pages/account/users/list")),
        layout: "VerticalLayout",
        group_name: ["admin"],
        perm_name: [""],
    },
    {
        path: "/group",
        component: lazy(() => import("../../view/pages/account/groups/list")),
        layout: "VerticalLayout",
        group_name: ["admin"],
        perm_name: [""],
    },
];

export default PagesRoutes;