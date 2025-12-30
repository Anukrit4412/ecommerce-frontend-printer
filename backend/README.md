# E-commerce Backend with eSewa Payment Integration

This is a Node.js backend for an e-commerce site with payment integration using eSewa.

## Setup

1. Navigate to the Back directory.
2. Run `npm install`
3. Run `npm start`

The server will run on http://localhost:3000

## Features

- Serves the frontend static files from ../Front
- API endpoint /api/products to get products
- Checkout endpoint /checkout to initiate eSewa payment
- Handles success and failure callbacks from eSewa

## Testing Payment

Use the test credentials from eSewa:
- eSewa ID: 9806800001
- Password: Nepal@123
- Token: 123456

## Production

For production, update the URLs in server.js to:
- https://epay.esewa.com.np/api/epay/main/v2/form
- https://esewa.com.np/api/epay/transaction/status/

And use live merchant credentials.