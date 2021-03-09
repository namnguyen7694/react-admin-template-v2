import React from "react";
import CustomButton from "../CustomButton/CustomButton";
interface Props {
  handleToggleButton?: any;
  visibleGroupButton?: boolean;
  buttonRender: Array<{ type: any; title: string; image?: string; buttonAction?: () => void }>;
}

const FloatingButton: React.FC<Props> = (props) => {
  const { visibleGroupButton } = props;
  const { buttonRender } = props;
  return (
    <>
      {buttonRender.map((btn, index) => (
        <div
          key={index}
          style={{ display: `${visibleGroupButton ? "flex" : "none"}`, right: 40 + 90 * (index + 1) }}
          className="floating-btn floating-btn__blocked"
        >
          <CustomButton
            type={btn.type}
            shape={"circle"}
            shadow={true}
            onClick={(event) => {
              btn.buttonAction && btn.buttonAction();
            }}
            item={<img src={btn.image} className="floating-btn__icon" alt="lock-act-icon" />}
            style={{ marginBottom: 8, width: 64, height: 64 }}
          />
          <p className="floating-btn__label">{btn.title}</p>
        </div>
      ))}
      <div className="floating-btn floating-btn__plus">
        <CustomButton
          type={visibleGroupButton ? "primary" : "secondary"}
          shape={"circle"}
          shadow={true}
          onClick={(event) => {
            props.handleToggleButton && props.handleToggleButton();
          }}
          item={
            visibleGroupButton ? (
              <svg className="floating-btn__icon" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.39524 7.25697L14.5134 1.13884L16.0602 2.68563L9.94204 8.80376L16.5988 15.4605L14.9277 17.1316L8.27094 10.4749L2.27711 16.4687L0.730314 14.9219L6.72415 8.92806L0.288372 2.49228L1.95946 0.821192L8.39524 7.25697Z"
                  fill="black"
                />
              </svg>
            ) : (
              <svg className="floating-btn__icon" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.3047 9.54688H19.957V11.7344H11.3047V21.1484H8.94141V11.7344H0.464844V9.54688H8.94141L8.94141 0.445312H11.3047L11.3047 9.54688Z"
                  fill="white"
                />
              </svg>
            )
          }
          style={{ marginBottom: "1.2rem", width: "6.4rem", height: "6.4rem" }}
        />
        <p className="floating-btn__label" style={{ visibility: "hidden", cursor: "default" }}>
          Appointment
        </p>
      </div>
    </>
  );
};

export default FloatingButton;
