import { ApiHelpers } from "./ApiHelpers";

export class RestfulBookerApiHelper {
  readonly apiHelpers: ApiHelpers;
  private readonly endpoint: string;

  constructor(apiHelpers: ApiHelpers) {
    this.apiHelpers = apiHelpers;
    this.endpoint = "/booking";
  }

  async createBooking(data: any) {
    return this.apiHelpers.post(this.endpoint, data);
  }

  async deleteBooking(id: string) {
    return this.apiHelpers.delete(`${this.endpoint}/${id}`);
  }

  async getBooking() {
    return this.apiHelpers.get(this.endpoint);
  }

  async patchBook(data: any, id: string) {
    return this.apiHelpers.put(`${this.endpoint}/${id}`, data);
  }

  async putBooking(data: any, id: string) {
    return this.apiHelpers.put(`${this.endpoint}/${id}`, data);
  }
}
