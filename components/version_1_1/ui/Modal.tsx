// base
import React, { CSSProperties } from "react";
// lib
import { Modal } from "antd";
// core
// style
import "./ui.css";

interface ICustomModalPropTypes {
  open: boolean;
  onCancel: () => void;
  onOk?: () => void;
  children: React.ReactNode;
  className?: string;
  okText?: string;
  cancelText?: string;
  footer?: React.ReactNode;
  centered?: boolean;
  closable?: boolean;
  width?: number;
  style?: CSSProperties;
}

const CustomModal: React.FC<ICustomModalPropTypes> = ({
  open,
  onCancel,
  onOk,
  children,
  okText = "تأیید",
  cancelText = "انصراف",
  footer,
  centered = true,
  width = 520,
  closable,
  style,
  className,
}) => {
  return (
    <Modal
      style={style}
      className={className}
      closable={closable}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      okText={okText}
      cancelText={cancelText}
      centered={centered}
      width={width}
      footer={footer !== undefined ? footer : undefined}
    >
      {children}
    </Modal>
  );
};

export { CustomModal };
