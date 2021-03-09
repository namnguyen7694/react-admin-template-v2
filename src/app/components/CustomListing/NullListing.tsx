import * as React from "react";

export declare module NullListingModule {
  export interface Props {
    type: string;
    className?: string;
    createOption?: boolean;
  }
  export interface State {}
}
class NullListing extends React.Component<NullListingModule.Props, NullListingModule.State> {
  render() {
    return (
      <div className="d_flex_col center" style={{height : "70vh"}}>
        <div
          style={{
            fontSize: "2.8rem",
            lineHeight: "130%",
            fontWeight: "bold",
            textAlign: "center",
            color: "#536380",
            marginTop: "4rem",
          }}
        >
          Start creating {this.props.type} now!
        </div>
        <div style={{ fontSize: "1.8rem", textAlign: "center", color: "#7A869A", marginTop: "2rem" }}>
          There are no {this.props.type} yet.
          {this.props.createOption && (
            <div style={{ fontSize: "1.8rem", textAlign: "center" }}>
              Click "Create" in the top right to create a new {" "}
              {this.props.type}.
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default NullListing;
