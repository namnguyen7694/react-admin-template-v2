import apiUtil from "../utils/api.util";

export const AuthService = {
  login,
  getMe,
};

async function login(token: string) {
  const res = await apiUtil.post({
    url: "/portal/login/",
    data: { token },
  });
  return res;
}

async function getMe() {
  const res = await apiUtil.get({
    url: "/portal/verify_token/",
  });
  return res;
}

