import apiUtil from "utils/api.util";

export type FormDataRequestType = {
  resourceType: "sim" | "plan" | "sim-lot" | "sim-type" | "distributor" | "sim-active";
  id: string;
};

export const getDetailResource = async (
  { resourceType, id }: FormDataRequestType,
  successCb: (data) => void,
  failCb: () => void
) => {
  const res = await apiUtil.get({
    url: `/portal/${resourceType}/detail/?id=${id}`,
  });
  if (res && res.status === 200) {
    successCb(res.data);
  } else {
    failCb();
  }
};
