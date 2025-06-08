import { Collapse } from "antd";
import type { CollapseProps } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { ReactNode, useState } from "react";
import styled from "styled-components";

const { Panel } = Collapse;

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
}

const CustomPanel = styled(Panel)`
  .ant-collapse-content {
    background: #ffffff;
  }

  .ant-collapse-header {
    border-radius: 10px !important;
    background: #f3f3f3 !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
    padding: 0;
  }

  .ant-collapse-content-box {
    padding: 0px 0px !important;
  }
`;

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  children,
}) => {
  const [activeKey, setActiveKey] = useState<string | string[]>();
  const [hovered, setHovered] = useState(false);

  const isActive =
    activeKey === "1" || (Array.isArray(activeKey) && activeKey.includes("1"));

  const iconColor = hovered || isActive ? "#fca120" : "inherit";

  const customExpandIcon: CollapseProps["expandIcon"] = ({ isActive }) =>
    isActive ? (
      <MinusOutlined
        style={{
          color: iconColor,
          marginTop: "4px",
          fontSize: 18,
        }}
      />
    ) : (
      <PlusOutlined
        style={{
          color: iconColor,
          marginTop: "4px",
          fontSize: 18,
        }}
      />
    );
  //.ant-collapse-content
  return (
    <Collapse
      activeKey={activeKey}
      onChange={(key) => setActiveKey(key)}
      bordered={false}
      expandIcon={customExpandIcon}
      expandIconPosition="right"
      style={{
        background: "white",
        width: "100%",
        height: "auto",
        padding: "0px",
      }}
    >
      <CustomPanel
        key="1"
        style={{
          padding: 0,
          background: "",
        }}
        header={
          <h4
            style={{
              fontSize: "17px",
              fontWeight: 600,
              color: iconColor,
              transition: "color 0.3s",
              cursor: "pointer",
              margin: 0,
              padding: 0,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {title}
          </h4>
        }
      >
        <div
          style={{
            background: "#ffffff",
            padding: "0",
          }}
        >
          {children}
        </div>
      </CustomPanel>
    </Collapse>
  );
};

export default ExpandableSection;
