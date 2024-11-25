import { test, expect } from "@playwright/test";
import { ApiHelpers } from "../restful-booker/helpers/ApiHelpers";
import { booking } from "./test-data/booking";

const apiHelpers = new ApiHelpers();
const EXPECTED_STATUS_CODE = 200;

test.beforeAll(async () => {
  await apiHelpers.authenticate();
});

test("Can create booking", async () => {
  const createBookingResponse = await apiHelpers.createBooking(booking);
  expect(createBookingResponse.status()).toBe(EXPECTED_STATUS_CODE);

  const createdBookingJson = await createBookingResponse.json();
  expect(createdBookingJson.bookingid).toBeDefined();
  expect(createdBookingJson.booking).toMatchObject(booking);
});

test("Can get booking", async () => {
  const createBookingResponse = await apiHelpers.createBooking(booking);
  const createdBookingJson = await createBookingResponse.json();
  const bookingId = createdBookingJson.bookingid;

  const getBookingResponse = await apiHelpers.getBooking(bookingId);
  const bookingJson = await getBookingResponse.json();

  expect(getBookingResponse.status()).toBe(200);
  expect(bookingJson).toMatchObject(booking);
});
