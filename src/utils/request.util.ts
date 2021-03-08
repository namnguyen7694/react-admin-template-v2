/* libs */
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosPromise } from "axios";
import { notification } from "antd";
import * as config from "constants/config.constant";
/* apps */
import { errorMessage } from "./message.util";
import tokenUtil from "./token.util";

class Request {
  private axiosInstance: AxiosInstance;
  readonly defaultHeaders: any = { "Content-Type": "application/json", Accept: "application/json" };
  constructor() {
    let headers: any = this.defaultHeaders;
    headers = { ...headers, ...this.getAuthHeader() };

    const axiosRequestConfig: AxiosRequestConfig = {
      baseURL: config.BASE_API_DOMAIN,
      timeout: 30000,
      headers,
    };
    const axiosInstance: AxiosInstance = Axios.create(axiosRequestConfig);

    this.axiosInstance = axiosInstance;
  }

  updateHeader() {
    let headersConfig: any = {
      ...this.defaultHeaders,
      ...this.getAuthHeader(),
    };

    this.axiosInstance.defaults.headers = headersConfig;
  }

  getAuthHeader() {
    let Authorization: string = "";
    let token = tokenUtil.getToken(config.TOKEN_NAME);
    if (token) {
      Authorization = `Bearer ${token}`;
    }

    return { Authorization };
  }

  setAuthHeader(token: string) {
    let Authorization: string = "Bearer ".concat(token);

    this.axiosInstance.defaults.headers.Authorization = Authorization;
  }

  removeAuthHeader() {
    this.axiosInstance.defaults.headers.Authorization = "";
  }

  setHeaders() {
    let headersConfig = {
      "Content-Type": "application/json",
    } as any;
    return (this.axiosInstance.defaults.headers = headersConfig);
  }

  handleError(error: any, hiddenServerError?: boolean) {
    if (error) {
      if (error.response) {
        let description: string = error.response.data.message;
        if (!Boolean(hiddenServerError)) {
          notification.error({ message: errorMessage.BASE, description });
        }
        return error.response;
      } else notification.error({ message: errorMessage.BASE, description: errorMessage.SERVER });
    } else {
      notification.error({
        message: errorMessage.BASE,
        description: errorMessage.CONNECTION,
      });
    }
  }

  get(
    input: { url: string; query?: any },
    headers: any = {},
    hiddenServerError?: boolean
  ): Promise<void | AxiosResponse<any>> {
    return this.send(
      {
        method: "get",
        url: input.url,
        params: input.query || {},
        data: {},
        headers,
      },
      hiddenServerError
    );
  }

  post(
    input: { url: string; data: any; query?: any },
    headers: any = {},
    hiddenServerError?: boolean
  ): Promise<void | AxiosResponse<any>> {
    return this.send(
      {
        method: "post",
        url: input.url,
        params: input.query || {},
        data: input.data,
        headers,
      },
      hiddenServerError
    );
  }

  posts(input: { url: string; data: any }): Promise<void | AxiosResponse<any>> {
    this.setHeaders();
    return this.axiosInstance
      .post(input.url, input.data)
      .then((res) => res)
      .catch((error) => this.handleError(error));
  }

  put(
    input: { url: string; data: any; query?: any },
    headers: any = {},
    hiddenServerError?: boolean
  ): Promise<void | AxiosResponse<any>> {
    return this.send(
      {
        method: "put",
        url: input.url,
        params: input.query || {},
        data: input.data,
        headers,
      },
      hiddenServerError
    );
  }

  delete(
    input: { url: string; data?: any; query?: any },
    headers: any = {},
    hiddenServerError?: boolean
  ): Promise<void | AxiosResponse<any>> {
    return this.send(
      {
        method: "delete",
        url: input.url,
        params: input.query || {},
        data: input.data || {},
        headers,
      },
      hiddenServerError
    );
  }

  head(input: { url: string; query?: any }, headers: any = {}, hiddenServerError?: boolean): AxiosPromise {
    return this.send(
      {
        method: "head",
        url: input.url,
        params: input.query || {},
        headers,
      },
      hiddenServerError
    );
  }

  send(options: AxiosRequestConfig, hiddenServerError?: boolean): AxiosPromise {
    const params: any = {
      ...options,
      headers: {
        ...this.axiosInstance.defaults.headers,
        ...options.headers,
      },
    };

    // add Authorization to header as defaults
    if (!params.headers.Authorization) {
      this.updateHeader();
      params.headers.Authorization = this.getAuthHeader().Authorization;
    }

    // remove undefined value
    for (const header in params.headers) {
      if (params.headers.hasOwnProperty(header)) {
        if (params.headers[header] === undefined) {
          delete params.headers[header];
        }
      }
    }

    return this.axiosInstance(params)
      .then((res) => {
        return res;
      })
      .catch((error) => this.handleError(error, Boolean(hiddenServerError)));
  }
}

export const RequestUtil = new Request();
