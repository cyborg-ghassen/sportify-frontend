import {Calendar, Bookmark, Award, Messages1, Shop} from 'iconsax-react';

import IntlMessages from "../../layout/components/lang/IntlMessages";
import {User} from "react-iconly";

const account = [
    {
        header: <IntlMessages id="sidebar-account"/>,
        group_name: ["admin"],
        perm_name: [],
    },
    {
        id: "account-accounts",
        title: <IntlMessages id="sidebar-account-accounts"/>,
        icon: <User size={18}/>,
        group_name: ["admin"],
        perm_name: [],
        children: [
            {
                id: "account-user",
                title: <IntlMessages id="account-users"/>,
                navLink: "/user",
                group_name: ["admin"],
                perm_name: [],
            },
            {
                id: "account-group",
                title: <IntlMessages id="account-groups"/>,
                navLink: "/group",
                group_name: ["admin"],
                perm_name: [],
            }
        ]
    },
];

export default account