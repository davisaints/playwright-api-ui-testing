import { test, expect } from "@playwright/test";
import { ApiHelpers } from "../restful-booker/helpers/ApiHelpers";
import { booking } from "./test-data/booking";

const apiHelpers = new ApiHelpers();

test.beforeAll(async ({}) => {
  await apiHelpers.authenticate();
});

test("Create a booking", async () => {
  const response = await apiHelpers.createBooking(booking);
  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();
  expect(responseBody.bookingid).toBeDefined();
});
