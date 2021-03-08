export type subMenuModel = {
  key: string;
  path: {
    [key: string]: string;
  };
  title: string;
  groups: string[];
};

export type routeModel = {
  key: string;
  path: {
    [key: string]: string;
  };
  title: string;
  component: any;
  images: { def: any; act: any };
  groups: string[];
  subMenu?: {
    [key: string]: subMenuModel;
  };
};
