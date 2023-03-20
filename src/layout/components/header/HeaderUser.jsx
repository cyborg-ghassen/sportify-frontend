import { Link } from "react-router-dom";

import { Dropdown, Col, Divider, Row } from "antd";
import { UserOctagon, Flag, Calendar, Calculator } from 'iconsax-react';

import avatarImg from "../../../assets/images/memoji/user-avatar-4.png";

export default function HeaderUser() {
  const menu = (
    <div className="hp-user-dropdown hp-border-radius hp-bg-black-0 hp-bg-dark-100 hp-border-color-dark-80 hp-py-24 hp-px-18 hp-mt-16">
      <span className="hp-d-block h5 hp-font-weight-500 hp-text-color-black-100 hp-text-color-dark-0 hp-mb-16">Profile Settings</span>

      <Link
        to="/sessions/profile/personel-information"
        className="hp-p1-body hp-font-weight-500 hp-hover-text-color-primary-2"
      >
        View Profile
      </Link>

      <Divider className="hp-mt-18 hp-mb-12" />

      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Link
            to="/sessions/profile/security"
            className="hp-p1-body hp-font-weight-500 hp-hover-text-color-primary-2"
          >
            Account Settings
          </Link>
        </Col>

        <Col span={24}>
          <Link
            to="/signin"
            onClick={() => {localStorage.clear()}}
            className="hp-p1-body hp-font-weight-500 hp-hover-text-color-primary-2"
          >
            Log out
          </Link>
        </Col>
      </Row>
    </div>
  );

  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <Col>
      <Dropdown overlay={menu} placement="bottomLeft">
        <div className="hp-border-radius-xl hp-cursor-pointer hp-border-1 hp-border-color-dark-80">
          <div className="hp-border-radius-lg hp-overflow-hidden hp-bg-info-4 hp-m-4 hp-d-flex" style={{ minWidth: 32, width: 32, height: 32 }}>
            <img src={user.url_path} alt="User" height="100%" />
          </div>
        </div>
      </Dropdown>
    </Col>
  );
};
