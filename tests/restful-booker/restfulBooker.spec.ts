import { test, expect } from "@playwright/test";
import { ApiHelpers } from "../restful-booker/helpers/ApiHelpers";
import { booking } from "./test-data/booking";

const HTTP_OK = 200;
const HTTP_STATUS_CREATED = 201;

const apiHelpers = new ApiHelpers();

test.beforeAll(async () => {
  await apiHelpers.initialize();
});

test("Can create booking", async () => {
  const createBookingResponse = await apiHelpers.createBooking(booking);
  expect(createBookingResponse.status()).toBe(HTTP_OK);

  const createdBookingJson = await createBookingResponse.json();
  expect(createdBookingJson.bookingid).toBeDefined();
  expect(createdBookingJson.booking).toMatchObject(booking);
});

test("Can delete booking", async () => {
  const createBookingResponse = await apiHelpers.createBooking(booking);
  const createdBookingJson = await createBookingResponse.json();
  const bookingId = createdBookingJson.bookingid;

  const deleteBookingResponse = await apiHelpers.deleteBooking(bookingId);
  expect(deleteBookingResponse.status()).toBe(HTTP_STATUS_CREATED);
});

test("Can get booking", async () => {
  const createBookingResponse = await apiHelpers.createBooking(booking);
  const createdBookingJson = await createBookingResponse.json();
  const bookingId = createdBookingJson.bookingid;

  const getBookingResponse = await apiHelpers.getBooking(bookingId);
  const bookingJson = await getBookingResponse.json();

  expect(getBookingResponse.status()).toBe(HTTP_OK);
  expect(bookingJson).toMatchObject(booking);
});

test("Can patch booking", async () => {
  const createBookingResponse = await apiHelpers.createBooking(booking);
  const createdBookingJson = await createBookingResponse.json();
  const bookingId = createdBookingJson.bookingid;

  const updatedBookingData = {
    firstname: "Joe",
    lastname: "Blogs",
  };

  const patchBookingResponse = await apiHelpers.patchBooking(
    bookingId,
    updatedBookingData
  );
  const bookingJson = await patchBookingResponse.json();

  expect(patchBookingResponse.status()).toBe(HTTP_OK);
  expect(bookingJson.firstname).toEqual(updatedBookingData.firstname);
  expect(bookingJson.lastname).toBe(updatedBookingData.lastname);
});
