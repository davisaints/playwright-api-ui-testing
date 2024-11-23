import { APIRequestContext, request } from "playwright";
import { RestfulBookerApiHelper } from "./RestfulBookerApiHelper";
import { sitesConfig } from "../sites.config";

export class ApiHelpers {
  readonly baseURL: string;
  readonly RestfulBookerApiHelper: RestfulBookerApiHelper;
  private token: string | null = null;
  private apiRequestContext: APIRequestContext;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.RestfulBookerApiHelper = new RestfulBookerApiHelper(this);
  }

  async authenticate() {
    this.apiRequestContext = await request.newContext();
    const response = await this.apiRequestContext.post(`${this.baseURL}/auth`, {
      data: {
        username: sitesConfig.auth.username,
        password: sitesConfig.auth.password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok()) {
      const responseBody = await response.json();
      this.token = responseBody.token;
    } else {
      throw new Error("Authentication failed");
    }
  }

  private getHeaders(): { [key: string]: string } {
    const headers: { [key: string]: string } = {};
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async get(endpoint: string) {
    return await this.apiRequestContext.get(`${this.baseURL}${endpoint}`, {
      headers: this.getHeaders(),
    });
  }

  async post(endpoint: string, data: any) {
    return await this.apiRequestContext.post(`${this.baseURL}${endpoint}`, {
      data,
      headers: this.getHeaders(),
    });
  }

  async put(endpoint: string, data: any) {
    return await this.apiRequestContext.put(`${this.baseURL}${endpoint}`, {
      data,
      headers: this.getHeaders(),
    });
  }

  async delete(endpoint: string) {
    return await this.apiRequestContext.delete(`${this.baseURL}${endpoint}`, {
      headers: this.getHeaders(),
    });
  }
}