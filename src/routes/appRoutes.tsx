import { lazy } from "react";
import * as GROUPS from "constants/user.groups";
import { routeModel } from "models/routes.model";

import customerDef from "assets/images/sidebar/ic_customer_def.svg";
import customerAct from "assets/images/sidebar/ic_customer_act.svg";

const Customer = lazy(() => import("app/modules/customer/Customer"));

export const ROUTES: { [key: string]: routeModel } = {
  CUSTOMER: {
    key: "1",
    path: {
      BASE: "/customer",
    },
    component: Customer,
    groups: [GROUPS.CUSTOMER_SUPPORT],
    title: "Customer Support",
    images: { def: customerDef, act: customerAct },
    subMenu: {
      INFO: {
        key: "1-1",
        path: {
          BASE: "/customer/info",
          DETAIL: "/customer/info/:id",
        },
        title: "Customer Info",
        groups: [GROUPS.CUSTOMER_SUPPORT],
      },
    },
  },
};

export const AUTH_ROUTES = {
  AUTH: "/users/auth",
};
