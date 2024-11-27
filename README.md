# API and UI Test Automation with Playwright

This project demonstrates an automation framework using Playwright for both API and UI testing. It automates interactions with two systems:

1. **Restful Booker API**: Manages bookings via a REST API, testing CRUD operations. You can access the API [here](https://restful-booker.herokuapp.com/).
2. **Swag Labs Web Application**: A sample e-commerce platform for automating UI tests such as login, product management, and checkout. You can access the web app [here](https://www.saucedemo.com/).

## Test Coverage

### API Tests
- **Restful Booker API**:
  - **Create Booking**: Validates that a booking can be successfully created via the API.
  - **Get Booking**: Verifies that a booking can be retrieved after creation.
  - **Delete Booking**: Ensures that a booking can be deleted correctly.
  - **Patch Booking**: Tests partial updates on booking details.
  - **Put Booking**: Verifies the ability to update a booking completely.

### UI Tests
- **Swag Labs Web App**:
  - **Login**: Verifies user login functionality with valid credentials (Standard user) and invalid credentials (Locked-out user).
  - **Checkout Process**: Automates the product selection, checkout, and payment flow, ensuring the user can complete a purchase and see the order confirmation message.
  - **Product Management**: Validates adding products to the cart, removing products from the cart, and verifying cart contents.
  - **Product Sorting**: Ensures products can be sorted by price (low to high and high to low).
  - **Checkout Details**: Verifies that the user can view payment, shipping, and total price information before completing the checkout.

## Project Structure

```plaintext
.
├── package.json
├── playwright.config.ts
├── README.md
├── test-results
│   └── TEST-playwright.xml
└── tests
    ├── restful-booker
    │   ├── config.ts
    │   ├── helpers
    │   └── restfulBooker.spec.ts
    └── swag-labs
        ├── checkoutProcess.spec.ts
        ├── config.ts
        ├── login.spec.ts
        └── pages
            ├── CheckoutPage.ts
            └── LoginPage.ts
```

## Contributing
Your contributions are always welcome! Collaboration helps us all grow together!
