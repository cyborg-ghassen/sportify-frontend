import React from "react";

import { Row, Col } from "antd";
import PageContent from "../../../../../layout/components/content/page-content";

export default function Blank() {
  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <PageContent
          title="Users List"
          breadcrumb={[
            {
              title: "Users",
            }
          ]}
        />
      </Col>
    </Row>
  );
}
