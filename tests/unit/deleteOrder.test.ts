import { handler as deleteOrder } from "../../src/functions/deleteOrder";

// Mock the DynamoDB client
jest.mock("../../src/utils/dynamodb", () => ({
  dynamoDbClient: {
    delete: jest.fn().mockResolvedValue({}),
  },
}));

describe("deleteOrder - Unit Tests", () => {
  test("should return 204 on successful delete", async () => {
    const event = {
      pathParameters: { id: "123" },
    };

    const response = await deleteOrder(event as any);
    expect(response.statusCode).toBe(204);
    expect(response.body).toBe("null");
  });

  test("should return 400 if id is missing", async () => {
    const event = {
      pathParameters: {},
    };

    const response = await deleteOrder(event as any);
    expect(response.statusCode).toBe(400);

    const body = JSON.parse(response.body);
    expect(body.error).toBeDefined();
  });
});
