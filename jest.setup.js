// jest.setup.js
process.env.AWS_REGION = "us-east-1";
process.env.ORDERS_TABLE = "coffee-shop-api-orders-dev";

// Set valid AWS credentials for testing (ideally from secure sources)
process.env.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
process.env.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
process.env.AWS_SDK_LOAD_CONFIG = "1";
