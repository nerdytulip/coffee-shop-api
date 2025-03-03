import { handler as getOrder } from "../../src/functions/getOrder";

// Mock the DynamoDB client
jest.mock("../../src/utils/dynamodb", () => ({
  dynamoDbClient: {
    get: jest.fn().mockResolvedValue({
      Item: { id: "123", customerName: "Test Customer" },
    }),
  },
}));

describe("getOrder - Unit Tests", () => {
  test("should return 200 and the order if found", async () => {
    const event = {
      pathParameters: { id: "123" },
    };

    const response = await getOrder(event as any);
    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);
    expect(body.id).toBe("123");
    expect(body.customerName).toBe("Test Customer");
  });

  test("should return 400 if id is missing", async () => {
    const event = {
      pathParameters: {},
    };

    const response = await getOrder(event as any);
    expect(response.statusCode).toBe(400);

    const body = JSON.parse(response.body);
    expect(body.error).toBeDefined();
  });

  test("should return 404 if order not found", async () => {
    // Adjust the mock to return empty result
    const dynamodb = require("../../src/utils/dynamodb");
    dynamodb.dynamoDbClient.get.mockResolvedValueOnce({}); // no Item

    const event = {
      pathParameters: { id: "999" },
    };

    const response = await getOrder(event as any);
    expect(response.statusCode).toBe(404);

    const body = JSON.parse(response.body);
    expect(body.error).toContain("not found");
  });
});
