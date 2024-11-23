import { test, expect } from "@playwright/test";
import { ApiHelpers } from "../restful-booker/helpers/ApiHelpers";

const apiHelpers = new ApiHelpers("https://restful-booker.herokuapp.com");

test("Create a booking", async () => {
  await apiHelpers.authenticate();

  const bookingData = {
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  };

  const response = await apiHelpers.RestfulBookerApiHelper.createBooking(
    bookingData
  );

  const responseBody = await response.json();
  console.log("Response Body:", responseBody);

  expect(response.ok()).toBeTruthy();
  expect(responseBody.bookingid).toBeDefined();
});
