import apiUtil from "../utils/api.util";

export const CustomerService = {
  getCustomers,
  getCustomerById,
  getCustomerByRef,
  getCustomerOrders,
  getCustomerOrderById,
};

async function getCustomers(payload: any) {
  const res = await apiUtil.post({
    url: "/portal/customer/list/",
    data: { ...payload },
  });
  return res;
}

async function getCustomerById(id: string) {
  const res = await apiUtil.get({
    url: "/portal/customer/detail/",
    params: {
      id,
    },
  });
  return res;
}

async function getCustomerByRef(reference: string) {
  const res = await apiUtil.get({
    url: "/portal/customer/detail-by-reference/",
    params: {
      reference,
    },
  });
  return res;
}

async function getCustomerOrders(payload: any) {
  const res = await apiUtil.post({
    url: "/portal/order/list/",
    data: {
      ...payload,
    },
  });
  return res;
}

async function getCustomerOrderById(id: string) {
  const res = await apiUtil.get({
    url: "/portal/order/detail/",
    params: {
      id,
    },
  });
  return res;
}
