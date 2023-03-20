import { Calendar, Bookmark, Award, Messages1, Shop } from 'iconsax-react';

import IntlMessages from "../../layout/components/lang/IntlMessages";
import {User} from "react-iconly";

const account = [
    {
        header: <IntlMessages id="sidebar-account" />,
    },
    {
        id: "account-accounts",
        title: <IntlMessages id="sidebar-account-accounts" />,
        icon: <User size={18} />,
        children: [
            {
                id: "account-user",
                title: <IntlMessages id="account-users" />,
                navLink: "/user"
            },
            {
                id: "account-group",
                title: <IntlMessages id="account-groups" />,
                navLink: "/group"
            }
        ]
    },
];

export default account