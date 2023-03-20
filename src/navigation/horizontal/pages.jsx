import { Award } from 'iconsax-react';

import IntlMessages from "../../layout/components/lang/IntlMessages";

const pages = [
    {
        id: "pages",
        header: <IntlMessages id="sidebar-pages" />,
        subMenu: [
            {
                id: "authentication",
                title: <IntlMessages id="sidebar-pages-authentication" />,
                icon: <Award size={18} />,
                children: [
                    {
                        id: "login-v1-page",
                        title: <IntlMessages id="sidebar-pages-login-v1" />,
                        navLink: "/sessions/authentication/login",
                    },
                    {
                        id: "login-v2-page",
                        title: <IntlMessages id="sidebar-pages-login-v2" />,
                        navLink: "/sessions/authentication-modern/login",
                    },
                    {
                        id: "register-v1-page",
                        title: <IntlMessages id="sidebar-pages-register-v1" />,
                        navLink: "/sessions/authentication/register",
                    },
                    {
                        id: "register-v2-page",
                        title: <IntlMessages id="sidebar-pages-register-v2" />,
                        navLink: "/sessions/authentication-modern/register",
                    },
                    {
                        id: "recover-v1-password",
                        title: <IntlMessages id="sidebar-pages-recover-password-v1" />,
                        navLink: "/sessions/authentication/recover-password",
                    },
                    {
                        id: "recover-v2-password",
                        title: <IntlMessages id="sidebar-pages-recover-password-v2" />,
                        navLink: "/sessions/authentication-modern/recover-password",
                    },
                    {
                        id: "reset-v1-password",
                        title: <IntlMessages id="sidebar-pages-reset-password-v1" />,
                        navLink: "/sessions/authentication/reset-password",
                    },
                    {
                        id: "reset-v2-password",
                        title: <IntlMessages id="sidebar-pages-reset-password-v2" />,
                        navLink: "/sessions/authentication-modern/reset-password",
                    },
                ],
            },
            {
                id: "errors",
                title: <IntlMessages id="sidebar-pages-error" />,
                icon: <Award size={18} />,
                children: [
                    {
                        id: "error-404",
                        title: "404",
                        navLink: "/sessions/error-404",
                    },
                    {
                        id: "error-403",
                        title: "403",
                        navLink: "/sessions/error-403",
                    },
                    {
                        id: "error-500",
                        title: "500",
                        navLink: "/sessions/error-500",
                    },
                    {
                        id: "error-503",
                        title: "503",
                        navLink: "/sessions/error-503",
                    },
                    {
                        id: "error-502",
                        title: "502",
                        navLink: "/sessions/error-502",
                    },
                    {
                        id: "maintenance",
                        title: <IntlMessages id="sidebar-pages-error-maintenance" />,
                        navLink: "/sessions/maintenance",
                    },
                    {
                        id: "comming-soon",
                        title: <IntlMessages id="sidebar-pages-error-coming-soon" />,
                        navLink: "/sessions/coming-soon",
                    },
                ],
            },
            {
                id: "profile",
                title: <IntlMessages id="sidebar-pages-profile" />,
                icon: <Award size={18} />,
                children: [
                    {
                        id: "profile-personel-information",
                        title: <IntlMessages id="sidebar-pages-profile-personel-information" />,
                        navLink: "/sessions/profile/personel-information",
                    },
                    {
                        id: "profile-notifications",
                        title: <IntlMessages id="sidebar-pages-profile-notifications" />,
                        navLink: "/sessions/profile/notifications",
                    },
                    {
                        id: "profile-activity",
                        title: <IntlMessages id="sidebar-pages-profile-activity-monitor" />,
                        navLink: "/sessions/profile/activity",
                    },
                    {
                        id: "profile-security",
                        title: <IntlMessages id="sidebar-pages-profile-security-settings" />,
                        navLink: "/sessions/profile/security",
                    },
                    {
                        id: "profile-password-change",
                        title: <IntlMessages id="sidebar-pages-profile-password-change" />,
                        navLink: "/sessions/profile/password-change",
                    },
                    {
                        id: "profile-connect-with-social",
                        title: <IntlMessages id="sidebar-pages-profile-connect-with-social" />,
                        navLink: "/sessions/profile/connect-with-social",
                    },
                ],
            },
            {
                id: "email",
                title: <IntlMessages id="sidebar-pages-email-templates" />,
                icon: <Award size={18} />,
                children: [
                    {
                        id: "email-hello",
                        title: <IntlMessages id="sidebar-pages-email-hello" />,
                        navLink: "https://yoda.hypeople.studio/yoda-email-template/hello.html",
                    },
                    {
                        id: "email-promotional",
                        title: <IntlMessages id="sidebar-pages-email-promotional" />,
                        navLink: "https://yoda.hypeople.studio/yoda-email-template/promotional.html",
                    },
                    {
                        id: "email-verify",
                        title: <IntlMessages id="sidebar-pages-email-verify" />,
                        navLink: "https://yoda.hypeople.studio/yoda-email-template/verify.html",
                    },
                    {
                        id: "email-reset-password",
                        title: <IntlMessages id="sidebar-pages-email-reset-password" />,
                        navLink: "https://yoda.hypeople.studio/yoda-email-template/reset-password.html",
                    },
                    {
                        id: "email-term",
                        title: <IntlMessages id="sidebar-pages-email-term" />,
                        navLink: "https://yoda.hypeople.studio/yoda-email-template/term.html",
                    },
                    {
                        id: "email-deactive-account",
                        title: <IntlMessages id="sidebar-pages-email-deactive-account" />,
                        navLink: "https://yoda.hypeople.studio/yoda-email-template/deactive-account.html",
                    },
                ],
            },
            {
                id: "lock-page",
                title: <IntlMessages id="sidebar-pages-lock-screen" />,
                icon: <Award size={18} />,
                children: [
                    {
                        id: "welcome",
                        title: <IntlMessages id="sidebar-pages-welcome" />,
                        navLink: "/sessions/welcome",
                    },
                    {
                        id: "password-is-changed",
                        title: <IntlMessages id="sidebar-pages-password-is-changed" />,
                        navLink: "/sessions/password-is-changed",
                    },
                    {
                        id: "deactivated",
                        title: <IntlMessages id="sidebar-pages-deactivated" />,
                        navLink: "/sessions/deactivated",
                    },
                    {
                        id: "lock",
                        title: <IntlMessages id="sidebar-pages-lock" />,
                        navLink: "/sessions/lock",
                    },
                ],
            },
            {
                id: "landing",
                title: <IntlMessages id="sidebar-pages-landing" />,
                icon: <Award size={18} />,
                navLink: "/sessions/landing",
            },
            {
                id: "pricing",
                title: <IntlMessages id="sidebar-pages-pricing" />,
                icon: <Award size={18} />,
                navLink: "/sessions/pricing",
            },
            {
                id: "invoice",
                title: <IntlMessages id="sidebar-pages-invoice" />,
                icon: <Award size={18} />,
                navLink: "/sessions/invoice",
            },
            {
                id: "faq",
                title: <IntlMessages id="sidebar-pages-faq" />,
                icon: <Award size={18} />,
                navLink: "/sessions/faq",
            },
            {
                id: "Users-page",
                title: <IntlMessages id="sidebar-pages-blank-page" />,
                icon: <Award size={18} />,
                navLink: "/sessions/Users-page",
            },
        ]
    },
];

export default pages