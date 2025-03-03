import { handler as createOrder } from "../../src/functions/createOrder";

// Mock the DynamoDB client so no real AWS calls are made
jest.mock("../../src/utils/dynamodb", () => ({
  dynamoDbClient: {
    put: jest.fn().mockResolvedValue({}),
  },
}));

describe("createOrder - Unit Tests", () => {
  test("should return 201 when order is created", async () => {
    const event = {
      body: JSON.stringify({
        customerName: "John Doe",
        items: [{ name: "Latte", quantity: 2, price: 4.5 }],
      }),
    };

    const response = await createOrder(event as any);
    expect(response.statusCode).toBe(201);

    const body = JSON.parse(response.body);
    expect(body.id).toBeDefined();
    expect(body.customerName).toBe("John Doe");
  });
});
