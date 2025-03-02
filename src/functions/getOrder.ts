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

    const result = await dynamoDbClient.get(id);

    if (!result.Item) {
      return createResponse(404, { error: "Order not found" });
    }

    return createResponse(200, result.Item);
  } catch (error) {
    console.error("Error getting order:", error);
    return createResponse(500, { error: "Could not retrieve order" });
  }
};
