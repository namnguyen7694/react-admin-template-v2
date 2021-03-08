import * as React from "react";
import { Spin } from "antd";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { CustomerListReducerType } from "app/store/customer/customerTypes";
import { RootState } from "app/store/config/rootReducer";
import { sagaActions } from "app/store/config/rootActions";
import { ROUTES } from "routes/appRoutes";

import CustomerListing from "./components/CustomerListing";
import CustomerDetail from "./components/CustomerDetail";
import { commonRequestFilter } from "models/requets.model";

export interface Props {
  match: any;
  history: any;
}
export interface State {}

interface MapStateToProps {
  customerList: CustomerListReducerType;
}

interface MapDispatchToProps {
  actions: typeof sagaActions;
}

export type MergeProps = MapStateToProps & MapDispatchToProps & Props;

class Customer extends React.Component<MergeProps, State> {
  loadCustomers = (payload: commonRequestFilter, filter?: { [key: string]: string | number | boolean | undefined }) => {
    this.props.actions.getCustomersAction({ ...payload, ...filter });
  };

  render() {
    return (
      <div className="customer" id="customer">
        <Spin
          spinning={this.props.customerList.loading}
          style={{ width: "100%", height: "80rem", margin: "10rem auto" }}
        >
          <Switch>
            <Route
              path={ROUTES.CUSTOMER?.subMenu?.INFO.path.BASE}
              exact
              render={() => <CustomerListing customerList={this.props.customerList} loadListing={this.loadCustomers} />}
            />
            <Route
              path={ROUTES.CUSTOMER?.subMenu?.INFO.path.DETAIL}
              exact
              render={(routeProps) => <CustomerDetail {...routeProps} />}
            />
          </Switch>
        </Spin>
      </div>
    );
  }
}

export default connect<MapStateToProps, MapDispatchToProps, Props, RootState>(
  (state: RootState) => {
    return {
      customerList: state.customerList,
    };
  },
  (dispatch: Dispatch) => {
    return {
      actions: bindActionCreators(Object.assign(sagaActions), dispatch),
    };
  }
)(Customer);
