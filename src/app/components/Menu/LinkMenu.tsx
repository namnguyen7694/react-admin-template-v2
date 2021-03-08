import * as React from "react";
import { NavLink, withRouter } from "react-router-dom";


const Menu: React.FC<any> = props => {
  const _activeRoute = (routeName: any, childrens?: any) => {
    if (props.history.location.pathname === routeName) {
      return true
    }
    else if (props.history.location.pathname.indexOf(routeName) > -1) {
      let str = props.history.location.pathname;
      return str.slice(0,str.length-1) === routeName
    }
    else return false
  };

  
  return (
    <div className={`${props.type}_menu`}>
      <ul>
        {props.menuRoutes.map((item: any, index: number) => (
          <li
          key={index}
            className={
              _activeRoute(item.path)
                ? `${props.type}_menuitem btn--shiny ${props.type}_menuitem-active`
                : `${props.type}_menuitem`
            }
          >
            <NavLink exact={true} to={item.path}>
              <img
              alt="index"
                key={index}
                src={
                  _activeRoute(item.path)
                    ? item.icons[0].act
                    : item.icons[0].def
                }
              />
              {item.title}
            </NavLink>
          </li>
        )
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu)
