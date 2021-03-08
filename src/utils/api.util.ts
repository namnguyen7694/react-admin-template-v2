/* libs */
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { message, notification } from "antd";
/* apps */
import * as config from "constants/config.constant";
import { errorMessage } from "./message.util";
import tokenUtil from "./token.util";

class ApiUtil {
  private axiosInstance: AxiosInstance;
  constructor() {
    const axiosRequestConfig: AxiosRequestConfig = {
      baseURL: config.BASE_API_DOMAIN,
      // baseURL: config.LOCAL_API_DOMAIN,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const axiosInstance: AxiosInstance = Axios.create(axiosRequestConfig);

    this.axiosInstance = axiosInstance;
  }

  setHeaderToken(useToken: boolean) {
    let headersConfig = {
      "Content-Type": "application/json",
      Accept: "application/json",
    } as any;
    let token = tokenUtil.getToken(config.TOKEN_NAME);
    if (!useToken) return (this.axiosInstance.defaults.headers = headersConfig);
    if (token !== null) {
      headersConfig = { ...headersConfig, Authorization: `TOKEN ${token}` };
    }
    return (this.axiosInstance.defaults.headers = headersConfig);
  }

  handleErroṛ(error: any) {
    if (error) {
      if (error.response) {
        message.error(error.response.data.detail, 3);
        if (error.response.status === 403) {
          tokenUtil.delToken(config.TOKEN_NAME);
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
        return Promise.resolve(error.response);
      } else notification.error({ message: errorMessage.BASE, description: errorMessage.SERVER });
    } else {
      notification.error({
        message: errorMessage.BASE,
        description: errorMessage.CONNECTION,
      });
    }
  }

  get(input: {
    url: string;
    setHeaderToken?: boolean;
    config?: AxiosRequestConfig;
    params?: any;
  }): Promise<void | AxiosResponse<any>> {
    if (input.setHeaderToken === false) {
      this.setHeaderToken(false);

      return this.axiosInstance
        .get(input.url, { params: input.params })
        .then((res) => res)
        .catch((error) => this.handleErroṛ(error));
    } else {
      this.setHeaderToken(true);
      return this.axiosInstance
        .get(input.url, {
          params: input.params,
        })
        .then((res) => res)
        .catch((error) => this.handleErroṛ(error));
    }
  }

  post(input: { url: string; data: any; setHeaderToken?: boolean }): Promise<void | AxiosResponse<any>> {
    if (input.setHeaderToken === false) {
      this.setHeaderToken(false);
      return this.axiosInstance
        .post(input.url, input.data)
        .then((res) => res)
        .catch((error) => this.handleErroṛ(error));
    } else {
      this.setHeaderToken(true);
      return this.axiosInstance
        .post(input.url, input.data)
        .then((res) => res)
        .catch((error) => this.handleErroṛ(error));
    }
  }

  put(input: { url: string; data: any; setHeaderToken?: boolean }): Promise<void | AxiosResponse<any>> {
    if (input.setHeaderToken === false) {
      this.setHeaderToken(false);
      return this.axiosInstance
        .put(input.url, input.data)
        .then((res) => res)
        .catch((error) => this.handleErroṛ(error));
    } else {
      this.setHeaderToken(true);
      return this.axiosInstance
        .put(input.url, input.data)
        .then((res) => res)
        .catch((error) => this.handleErroṛ(error));
    }
  }

  delete(input: { url: string; data?: any; setHeaderToken?: boolean }): Promise<void | AxiosResponse<any>> {
    if (input.setHeaderToken === false) {
      this.setHeaderToken(false);
      return this.axiosInstance
        .delete(input.url, input.data)
        .then((res) => res)
        .catch((error) => this.handleErroṛ(error));
    } else {
      this.setHeaderToken(true);
      return this.axiosInstance
        .delete(input.url, input.data)
        .then((res) => res)
        .catch((error) => this.handleErroṛ(error));
    }
  }
}

export default new ApiUtil();
