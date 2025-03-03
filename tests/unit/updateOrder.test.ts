import { handler as updateOrder } from "../../src/functions/updateOrder";

// Mock the DynamoDB client
jest.mock("../../src/utils/dynamodb", () => ({
  dynamoDbClient: {
    update: jest.fn().mockResolvedValue({
      Attributes: {
        id: "123",
        orderStatus: "COMPLETED",
        updatedAt: 123456789,
      },
    }),
  },
}));

describe("updateOrder - Unit Tests", () => {
  test("should return 200 and updated order", async () => {
    const event = {
      pathParameters: { id: "123" },
      body: JSON.stringify({ orderStatus: "COMPLETED" }),
    };

    const response = await updateOrder(event as any);
    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);
    expect(body.id).toBe("123");
    expect(body.orderStatus).toBe("COMPLETED");
  });

  test("should return 400 if id is missing", async () => {
    const event = {
      pathParameters: {},
      body: JSON.stringify({ orderStatus: "COMPLETED" }),
    };

    const response = await updateOrder(event as any);
    expect(response.statusCode).toBe(400);

    const responseBody = JSON.parse(response.body);
    expect(responseBody.error).toBeDefined();
  });

  test("should return 500 on update error", async () => {
    // Adjust the mock to throw an error
    const dynamodb = require("../../src/utils/dynamodb");
    dynamodb.dynamoDbClient.update.mockRejectedValueOnce(
      new Error("Update failed")
    );

    const event = {
      pathParameters: { id: "123" },
      body: JSON.stringify({ orderStatus: "COMPLETED" }),
    };

    const response = await updateOrder(event as any);
    expect(response.statusCode).toBe(500);

    const responseBody = JSON.parse(response.body);
    expect(responseBody.error).toContain("Could not update order");
  });
});
