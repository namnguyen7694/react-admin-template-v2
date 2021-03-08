import React, { Component } from "react";
import { AuthReducerType } from "app/store/auth/authTypes";
import { RootState } from "app/store/config/rootReducer";
import { connect } from "react-redux";
import _ from "lodash";
import { Dispatch } from "redux";

export interface Props {
  groups_permission: string[];
  component: React.ReactNode;
  skip?: boolean;
}

interface MapStateToProps {
  auth: AuthReducerType;
}

interface MapDispatchToProps {}

export type MergeProps = MapDispatchToProps & MapStateToProps & Props;

class Permission extends Component<MergeProps> {
  can = () => {
    let auth: boolean = false;
    if (this.props.skip) return (auth = true);
    if (
      this.props.auth.data.user &&
      _.intersection(this.props.groups_permission, this.props.auth.data.user?.groups).length > 0
    ) {
      auth = true;
    }
    return auth;
  };

  render() {
    return <>{this.can() && this.props.component}</>;
  }
}

export default connect<MapStateToProps, MapDispatchToProps, Props, RootState>(
  (state: RootState) => {
    return {
      auth: state.auth,
    };
  },
  (dispatch: Dispatch) => {
    return {};
  }
)(Permission);
