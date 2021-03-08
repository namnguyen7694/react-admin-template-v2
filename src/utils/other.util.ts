import { CustomerDetailOutputModel } from "app/store/customer/customerTypes";
import { commonRequestFilter } from "models/requets.model";

export const buildDetailRoute = (path: string, id: string, pattern: string = ":id"): string => {
  return path.replace(pattern, id);
};

export const loadCallback = (cb?: (data?: any) => void, data?: any) => {
  if (typeof cb === "function") {
    data ? cb(data) : cb();
  }
};

export const buildAddressAcivation = (input: any) => {
  const { address, street, district, ward, province } = input;
  let build_address: string = "";
  if (Boolean(address)) {
    build_address += address.concat(", ");
  }
  if (Boolean(street)) {
    build_address += street.concat(" Street, ");
  }
  if (Boolean(ward)) {
    build_address += ward.concat(", ");
  }
  if (Boolean(district)) {
    build_address += district.concat(", ");
  }
  if (Boolean(province)) {
    build_address += province.concat(" .");
  }
  return build_address;
};

export const getUserIdentity = (user: CustomerDetailOutputModel) => {
  const identity = user.phone_number ? user.phone_number : user.email ? user.email : user.device_sn;
  return identity;
};

export const getPagination = (payload: commonRequestFilter, total: number) => {
  const pagination = {
    keyword: payload.keyword,
    totalPages: Math.ceil(total / payload.page_size),
    page_number: payload.page_number,
    page_size: payload.page_size,
    start_date: payload.start_date,
    end_date: payload.end_date,
  };
  return pagination;
};
