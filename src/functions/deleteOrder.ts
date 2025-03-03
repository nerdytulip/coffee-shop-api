import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { dynamoDbClient } from "../utils/dynamodb";
import { createResponse } from "../utils/response";

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters || {};

    if (!id) {
      return createResponse(400, { error: "Order ID is required" });
    }

    await dynamoDbClient.delete(id);
    return createResponse(204, null);
  } catch (error) {
    console.error("Error deleting order:", error);
    return createResponse(500, { error: "Could not delete order" });
  }
};
