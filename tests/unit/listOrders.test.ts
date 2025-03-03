import { handler as listOrders } from "../../src/functions/listOrders";

// Mock the DynamoDB client
jest.mock("../../src/utils/dynamodb", () => ({
  dynamoDbClient: {
    scan: jest.fn().mockResolvedValue({
      Items: [
        { id: "1", customerName: "John Doe" },
        { id: "2", customerName: "Jane Doe" },
      ],
    }),
  },
}));

describe("listOrders - Unit Tests", () => {
  test("should return 200 and a list of orders", async () => {
    const event = {};

    const response = await listOrders(event as any);
    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);
    expect(body.length).toBe(2);
    expect(body[0].customerName).toBe("John Doe");
  });

  test("should return 500 on scan error", async () => {
    // Adjust the mock to throw an error
    const dynamodb = require("../../src/utils/dynamodb");
    dynamodb.dynamoDbClient.scan.mockRejectedValueOnce(
      new Error("Scan failed")
    );

    const event = {};
    const response = await listOrders(event as any);
    expect(response.statusCode).toBe(500);

    const body = JSON.parse(response.body);
    expect(body.error).toContain("Could not list orders");
  });
});
