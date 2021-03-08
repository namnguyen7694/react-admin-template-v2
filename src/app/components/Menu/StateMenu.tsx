import * as React from "react";
import { withRouter } from "react-router-dom";


const Menu: React.FC<any> = props => {
  const _activeRoute = (routeName: any, childrens?: any) => {
    if (props.activeMenu === routeName) {
      return true
    }
    
    else return false
  };

  const changeActiveRoute = (routeName: any) => {
      props.changeActiveRoute(routeName)
  }

  
  return (
    <div className={`${props.type}_menu`}>
      <ul>
        {props.menuRoutes.map((item: any, index: number) => (
          <li
            onClick={ () => changeActiveRoute(item.path)}
            key={index}
            className={
              _activeRoute(item.path)
                ? `${props.type}_menuitem btn--shiny ${props.type}_menuitem-active`
                : `${props.type}_menuitem`
            }
          >
            <img alt="index" key={index} src={_activeRoute(item.path) ? item.icons[0].act : item.icons[0].def} />
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withRouter(Menu)
