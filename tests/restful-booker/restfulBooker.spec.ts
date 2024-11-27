import { test, expect } from "@playwright/test";
import { ApiHelpers } from "../restful-booker/helpers/ApiHelpers";
import { booking } from "./test-data/booking";

const HTTP_STATUS_CREATED = 201;

const apiHelpers = new ApiHelpers();

test.beforeAll(async () => {
  await apiHelpers.initialize();
});

test("Can create booking", async () => {
  const createBookingResponse = await apiHelpers.createBooking(booking);
  expect(createBookingResponse.status()).toBe(EXPECTED_STATUS_CODE);

  const createdBookingJson = await createBookingResponse.json();
  expect(createdBookingJson.bookingid).toBeDefined();
  expect(createdBookingJson.booking).toMatchObject(booking);
});

test("Can delete booking", async () => {
  const createBookingResponse = await apiHelpers.createBooking(booking);
  const createdBookingJson = await createBookingResponse.json();
  const bookingId = createdBookingJson.bookingid;

  console.log(bookingId)
  const deleteBookingResponse = await apiHelpers.deleteBooking(bookingId);
  expect(deleteBookingResponse.status()).toBe(HTTP_STATUS_CREATED);
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
