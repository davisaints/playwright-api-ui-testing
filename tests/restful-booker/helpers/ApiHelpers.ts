import { APIRequestContext, request } from "playwright";
import { sitesConfig } from "../sites.config";
import { booking } from "../test-data/booking";

export class ApiHelpers {
  private readonly baseURL: string;
  private apiRequestContext: APIRequestContext;

  public constructor() {
    this.baseURL = sitesConfig.url.baseUrl;
  }

  public async authenticate() {
    this.apiRequestContext = await request.newContext();
    const response = await this.apiRequestContext.post(`${this.baseURL}/auth`, {
      data: {
        username: sitesConfig.auth.username,
        password: sitesConfig.auth.password,
      },
    });

    if (response.status() !== 200) {
      throw new Error("Authentication failed");
    }
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
      }
    );
  }

  public async put(bookingId: string, data: any) {
    return await this.apiRequestContext.put(
      `${this.baseURL}/booking/${bookingId}`,
      {
        data,
      }
    );
  }

  async delete(bookingId: string) {
    return await this.apiRequestContext.delete(`${this.baseURL}/booking`);
  }
}
