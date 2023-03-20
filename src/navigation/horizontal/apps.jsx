import { Calendar, Bookmark, Award, Messages1, Shop } from 'iconsax-react';

import IntlMessages from "../../layout/components/lang/IntlMessages";

const apps = [
    {
        id: "apps",
        header: <IntlMessages id="sidebar-apps" />,
        subMenu: [
            {
                id: "account-calendar",
                title: <IntlMessages id="sidebar-apps-calendar" />,
                icon: <Calendar size={18} />,
                navLink: "/account/calendar",
            },
            {
                id: "contact",
                title: <IntlMessages id="sidebar-apps-contact" />,
                icon: <Bookmark size={18} />,
                navLink: "/account/contact",
            },
            {
                id: "ecommerce",
                title: <IntlMessages id="sidebar-apps-ecommerce" />,
                icon: <Award size={18} />,
                children: [
                    {
                        id: "shop",
                        title: <IntlMessages id="sidebar-apps-ecommerce-shop" />,
                        navLink: "/account/ecommerce/shop",
                    },
                    {
                        id: "wishlist",
                        title: <IntlMessages id="sidebar-apps-ecommerce-wishlist" />,
                        navLink: "/account/ecommerce/wishlist",
                    },
                    {
                        id: "product-detail",
                        title: <IntlMessages id="sidebar-apps-ecommerce-product-detail" />,
                        navLink: "/account/ecommerce/product-detail/0",
                    },
                    {
                        id: "checkout",
                        title: <IntlMessages id="sidebar-apps-ecommerce-checkout" />,
                        navLink: "/account/ecommerce/checkout",
                    },
                    {
                        id: "inventory",
                        title: <IntlMessages id="sidebar-apps-ecommerce-inventory" />,
                        navLink: "/account/ecommerce/inventory",
                    },
                ],
            },
            {
                id: "mailbox",
                title: <IntlMessages id="sidebar-apps-mailbox" />,
                icon: <Messages1 size={18} />,
                tag: <IntlMessages id="coming-soon" />,
            },
            {
                id: "knowledge-base",
                title: <IntlMessages id="sidebar-pages-knowledge-base" />,
                icon: <Award size={18} />,
                children: [
                    {
                        id: "knowledge-base-1",
                        title: <IntlMessages id="sidebar-pages-knowledge-base-1" />,
                        navLink: "/sessions/knowledge-base/knowledge-base-1",
                    },
                    {
                        id: "knowledge-base-2",
                        title: <IntlMessages id="sidebar-pages-knowledge-base-2" />,
                        navLink: "/sessions/knowledge-base/knowledge-base-2",
                    },
                ],
            },
            {
                id: "file-manager",
                title: <IntlMessages id="sidebar-apps-file-manager" />,
                icon: <Shop size={18} />,
                tag: <IntlMessages id="coming-soon" />,
            },
        ]
    },
];

export default apps