import { APIRequestContext, request } from "playwright";
import { sitesConfig } from "../sites.config";

export class ApiHelpers {
  private readonly baseURL: string;
  private apiRequestContext: APIRequestContext;

  public constructor() {
    this.baseURL = sitesConfig.url.baseUrl;
  }

  public async initialize() {
    this.apiRequestContext = await request.newContext();
  }

  private async getHeader(): Promise<{ [key: string]: string }> {
    const basicAuthCredentials = Buffer.from(
      `${sitesConfig.auth.username}:${sitesConfig.auth.password}`
    ).toString("base64");

    return {
      Authorization: `Basic ${basicAuthCredentials}`,
      "Content-Type": "application/json",
    };
  }

  public async getBooking(bookingId: string) {
    return await this.apiRequestContext.get(
      `${this.baseURL}/booking/${bookingId}`
    );
  }

  public async createBooking(data: any) {
    return await this.apiRequestContext.post(`${this.baseURL}/booking`, {
      data,
    });
  }

  public async patchBooking(bookingId: string, data: any) {
    return await this.apiRequestContext.patch(
      `${this.baseURL}/booking/${bookingId}`,
      {
        data,
        headers: await this.getHeader(),
      }
    );
  }

  public async putBooking(bookingId: string, data: any) {
    return await this.apiRequestContext.put(
      `${this.baseURL}/booking/${bookingId}`,
      {
        data,
        headers: await this.getHeader(),
      }
    );
  }

  async deleteBooking(bookingId: string) {
    return await this.apiRequestContext.delete(
      `${this.baseURL}/booking/${bookingId}`,
      {
        headers: await this.getHeader(),
      }
    );
  }
}
