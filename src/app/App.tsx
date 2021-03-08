import React, { Suspense, lazy } from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Card, Layout, Menu } from "antd";
import { MenuOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import _ from "lodash";
import * as config from "constants/config.constant";
import { ROUTES } from "routes/appRoutes";
import Auth from "app/components/Auth/Auth";
import { AuthReducerType } from "./store/auth/authTypes";
import { sagaActions } from "./store/config/rootActions";
import { connect } from "react-redux";
import { RootState } from "./store/config/rootReducer";
import { bindActionCreators, Dispatch } from "redux";
import * as CONSTANTS from "constants/index";
import tokenUtil from "utils/token.util";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const NotFound = lazy(() => import("app/components/NotFound/NotFound"));
export declare module AppLayoutModule {
  export interface Props {
    history: any;
  }
  export interface State {
    submnuKeyCollapsed: string;
    mouseEnterWithinChildren: boolean;
    collapsed: boolean;
    appView: boolean;
  }
}

interface MapStateToProps {
  auth: AuthReducerType;
}

interface MapDispatchToProps {
  actions: typeof sagaActions;
}

export type MergeProps = MapStateToProps & MapDispatchToProps & AppLayoutModule.Props;

class AppLayout extends React.Component<MergeProps, AppLayoutModule.State> {
  // private _nodes: any;
  constructor(props: MergeProps) {
    super(props);

    this.state = {
      submnuKeyCollapsed: "",
      mouseEnterWithinChildren: false,
      collapsed: false,
      appView: true,
    };

    // this._nodes = new Map();
  }

  getAdminInfo = () => {
    return {
      name: Boolean(this.props.auth.data.user.profile.name) ? this.props.auth.data.user.profile.name : "Admin",
      profile: Boolean(this.props.auth.data.user.profile.avatar_url)
        ? this.props.auth.data.user.profile.avatar_url
        : "",
    };
  };

  checkWindowSize = () => {
    const width = window.innerWidth;
    if (width < 768) {
      this.setState({ appView: false });
    } else {
      this.setState({ appView: true });
    }
  };

  componentDidMount() {
    if (tokenUtil.getToken(config.TOKEN_NAME)) {
      this.props.actions.loadAuthAction();
    }
    this.checkWindowSize();
    window.addEventListener("resize", () => {
      this.checkWindowSize();
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.checkWindowSize());
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  _activeRoute = (routeName: any, childrens?: any) => {
    if (routeName === "/") {
      return this.props.history.location.pathname === routeName;
    } else {
      return this.props.history.location.pathname.indexOf(routeName) > -1 ? true : false;
    }
  };

  getDefaultSelectedKeys = () => {
    let key: string[] = [];
    let open: string[] = [];
    for (let route of Object.values(ROUTES)) {
      if (route.subMenu) {
        const selected = Object.values(route.subMenu).find((sub) =>
          this.props.history.location.pathname.includes(sub.path.BASE)
        );
        if (selected) return { key: [selected.key], open: [route.key] };
      } else {
        const include = this.props.history.location.pathname.includes(route.path.BASE);
        if (include) return { key: [route.key], open: [] };
      }
    }
    return { key, open };
  };

  authRoute = (groups: string[]) => {
    let auth: boolean = false;
    if (this.props.auth.data.user.id && _.intersection(groups, this.props.auth.data.user.groups).length > 0) {
      auth = true;
    } else if (this.props.auth.data.user?.groups.includes(CONSTANTS.ADMIN)) {
      auth = true;
    }
    return auth;
  };

  render() {
    const activeMenu = Object.values(ROUTES).find(
      (route) => this.props.history.location.pathname.indexOf(route.path.BASE) > -1
    );

    const subActiveMenu =
      activeMenu && activeMenu.subMenu
        ? Object.values(activeMenu.subMenu).find(
            (sub) => this.props.history.location.pathname.indexOf(sub.path.BASE) > -1
          )
        : undefined;

    const user = this.props.auth.data.user;

    return (
      <>
        {this.props.auth.data.token ? (
          this.state.appView ? (
            <Layout className="layout" id="layout">
              <Sider
                width={"25rem"}
                collapsible
                collapsed={this.state.collapsed}
                collapsedWidth={"6.4rem"}
                className="layout__sider"
                trigger={null}
              >
                {this.state.collapsed ? (
                  <div className="layout__sider-logo" style={{ alignItems: "center" }}>
                    <MenuOutlined className="layout__sider-trigger" onClick={this.toggleCollapsed} />
                    <Avatar
                      icon={<UserOutlined />}
                      src={this.props.auth.data.user?.profile.avatar_url!}
                      style={{ width: "5rem", height: "5rem", marginTop: "3rem" }}
                    />
                  </div>
                ) : (
                  <div className="layout__sider-logo">
                    <div
                      style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}
                    >
                      <MenuOutlined className="layout__sider-trigger" onClick={this.toggleCollapsed} />
                      <LogoutOutlined
                        style={{ color: "#fff", cursor: "pointer", marginRight: "1rem" }}
                        onClick={() => this.props.actions.logoutAction()}
                      />
                    </div>
                    <Card.Meta
                      avatar={<Avatar icon={<UserOutlined />} src={this.getAdminInfo().profile} />}
                      title={this.getAdminInfo().name}
                      description={user?.email}
                    />
                  </div>
                )}

                <Menu
                  defaultSelectedKeys={this.getDefaultSelectedKeys().key}
                  defaultOpenKeys={this.getDefaultSelectedKeys().open}
                  selectedKeys={this.getDefaultSelectedKeys().key}
                  theme={"light"}
                  mode={"inline"}
                  className="layout__menu"
                >
                  {Object.values(ROUTES).map((route, index: number) =>
                    route.subMenu
                      ? this.authRoute(route.groups) && (
                          <SubMenu
                            key={route.key}
                            title={
                              <>
                                {route.images && (
                                  <img
                                    className="layout__menu-icon-image"
                                    // ref={(c) => this._nodes.set(index, c)}
                                    src={route.images.def}
                                    alt="icon_menu"
                                  />
                                )}
                                <span>{route.title}</span>
                              </>
                            }
                          >
                            {Object.values(route.subMenu).map(
                              (sub, idx) =>
                                this.authRoute(sub.groups) && (
                                  <Menu.Item key={sub.key} title={sub.title}>
                                    <NavLink
                                      exact={true}
                                      title=""
                                      to={sub.path.BASE}
                                      className={
                                        this._activeRoute(sub.path.BASE)
                                          ? "layout__menu-icon--active"
                                          : "layout__menu-icon"
                                      }
                                    >
                                      <span>{sub.title}</span>
                                    </NavLink>
                                  </Menu.Item>
                                )
                            )}
                          </SubMenu>
                        )
                      : this.authRoute(route.groups) && (
                          <Menu.Item key={route.key} title={route.title}>
                            <NavLink
                              exact={true}
                              title=""
                              to={route.path.BASE}
                              className={
                                this._activeRoute(route.path.BASE) ? "layout__menu-icon--active" : "layout__menu-icon"
                              }
                            >
                              {route.images && (
                                <img
                                  className="layout__menu-icon-image"
                                  // ref={(c) => this._nodes.set(index, c)}
                                  src={this._activeRoute(route.path.BASE) ? route.images.act : route.images.def}
                                  alt="icon_menu"
                                />
                              )}
                              <span>{route.title}</span>
                            </NavLink>
                          </Menu.Item>
                        )
                  )}
                </Menu>
              </Sider>

              <Layout>
                <Header>
                  <div className="layout__header">
                    <span className="layout__header-label">
                      {activeMenu ? activeMenu.title : ""}
                      {subActiveMenu ? `/${subActiveMenu.title}` : ""}
                    </span>
                  </div>
                </Header>

                <Content>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                      {Object.values(ROUTES).map((route, idx) =>
                        route.subMenu ? (
                          Object.values(route.subMenu).map((sub, idx) => (
                            <Route
                              path={[...Object.values(sub.path)]}
                              exact
                              render={(routeProps) => {
                                return this.authRoute(route.groups) ? (
                                  <route.component {...routeProps} />
                                ) : (
                                  this.props.auth.data.user.id && <Redirect from="/*" exact to={"/notfound"} />
                                );
                              }}
                              key={idx}
                            />
                          ))
                        ) : (
                          <Route
                            path={[...Object.values(route.path)]}
                            exact
                            render={(routeProps) =>
                              this.authRoute(route.groups) ? (
                                <route.component {...routeProps} />
                              ) : (
                                this.props.auth.data.user.id && <Redirect from="/*" exact to={"/notfound"} />
                              )
                            }
                            key={idx}
                          />
                        )
                      )}
                      <Route path="/notfound" exact component={NotFound} />
                      <Redirect from="/" exact to={ROUTES.CUSTOMER?.subMenu?.INFO.path.BASE!} />
                      <Redirect from="/*" exact to={"/notfound"} />
                    </Switch>
                  </Suspense>
                </Content>
              </Layout>
            </Layout>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <h1>Oops!! Sorry </h1>
              <h2 style={{ textAlign: "center", width: "80%" }}>
                App not support window size bellow 768px inner-width
              </h2>
            </div>
          )
        ) : (
          <Auth />
        )}
      </>
    );
  }
}

export default connect<MapStateToProps, MapDispatchToProps, AppLayoutModule.Props, RootState>(
  (state: RootState) => {
    return {
      auth: state.auth,
    };
  },
  (dispatch: Dispatch) => {
    return {
      actions: bindActionCreators(Object.assign(sagaActions), dispatch),
    };
  }
)(AppLayout);
