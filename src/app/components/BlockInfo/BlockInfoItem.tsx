import { Col } from "antd";
import React from "react";

type Props = {
  title: string;
  info: string | null | undefined;
  md_width?: number;
  xs_width?: number;
};

export const BlockInfoItem = (props: Props) => {
  return (
    <Col xs={props.xs_width ?? 24} md={props.md_width ?? 12}>
      <div className="info-block__title">{props.title}</div>
      <div className="info-block__info">{Boolean(props.info) ? props.info : "-"}</div>
    </Col>
  );
};
