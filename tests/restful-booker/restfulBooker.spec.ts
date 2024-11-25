import { test, expect } from "@playwright/test";
import { ApiHelpers } from "../restful-booker/helpers/ApiHelpers";
import { booking } from "./test-data/booking";

const apiHelpers = new ApiHelpers();

test.beforeAll(async ({}) => {
  await apiHelpers.authenticate();
});

test("Can create booking", async () => {
  const response = await apiHelpers.createBooking(booking);
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.bookingid).toBeDefined();
  expect(responseBody.booking).toEqual(booking);
});

test("Can get booking", async () => {
  const createBookingResponse = await apiHelpers.createBooking(booking);
  const createdBooking = await createBookingResponse.json();

  const bookingId = createdBooking.bookingid;

  const getBookingResponse = await apiHelpers.getBooking(bookingId);
  const retrievedBooking = await getBookingResponse.json();

  expect(getBookingResponse.status()).toBe(200);
  expect(retrievedBooking).toMatchObject(booking);
});
