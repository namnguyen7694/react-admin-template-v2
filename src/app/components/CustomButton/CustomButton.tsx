import React, { ReactNode } from "react";

export declare module CustomButtonModule {
  export interface BtnProps {
    /**
     * Các loại kiểu của component (new, confirmed, arrived, in service, no show, cancelled, completed) tương ứng với các trạng thái của lịch hẹn
     */
    type?:
      | "new"
      | "confirmed"
      | "arrived"
      | "inservice"
      | "noshow"
      | "cancelled"
      | "completed"
      | "primary"
      | "secondary";
    /**
     * Nội dung (phần tử) của component
     */
    item: ReactNode;
    /**
     * Các loại hình dạng của component (circle, oval, square)
     */
    shape?: "circle" | "oval" | "square";
    /**
     * Disabled component
     */
    disabled?: boolean;
    /**
     * Kích hoạt tông màu ngược lại của component
     */
    outline?: boolean;
    /**
     * Kích hoạt hiệu ứng bóng mờ của component
     */
    shadow?: boolean;
    /**
     * Kích hoạt thuộc tính rê chuột vào component
     */
    hover?: boolean;
    /**
     * Kích hoạt hiệu ứng mờ của component
     */
    opacity?: boolean;
    /**
     * Style native của CSS
     */
    style?: React.CSSProperties;
    /**
     * Các classname hỗ trợ
     */
    className?: string;
    /* handlers */
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  }
}

const CustomButton = React.forwardRef((props: CustomButtonModule.BtnProps, ref: any) => (
  <button
    type="button"
    ref={ref}
    onClick={props.onClick}
    onBlur={props.onBlur}
    style={{ ...props.style }}
    className={`btn btn--transparent btn--shiny ${props.hover ? `btn--hover` : ""} ${
      props.shadow ? `btn--shadow` : ""
    } ${props.type ? `btn--${props.type} btn--${props.type}-active` : ""} ${
      props.outline ? `btn--${props.type}-outline` : ""
    } ${props.shape ? `btn__${props.shape}` : ""} ${props.opacity ? `btn--opacity` : ""} ${
      props.disabled ? `btn--disabled` : ""
    } ${props.className}`}
  >
    {props.item}
  </button>
));

CustomButton.defaultProps = {
  className: "",
};

export default CustomButton;
