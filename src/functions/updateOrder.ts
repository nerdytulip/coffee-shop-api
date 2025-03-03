import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { dynamoDbClient } from "../utils/dynamodb";
import { createResponse } from "../utils/response";

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters || {};
    const data = JSON.parse(event.body || "{}");

    if (!id) {
      return createResponse(400, { error: "Order ID is required" });
    }

    const timestamp = new Date().getTime();
    const { status } = data;

    const result = await dynamoDbClient.update(
      id,
      "set #status = :status, updatedAt = :updatedAt",
      {
        ":status": status,
        ":updatedAt": timestamp,
      }
    );

    return createResponse(200, result.Attributes);
  } catch (error) {
    console.error("Error updating order:", error);
    return createResponse(500, { error: "Could not update order" });
  }
};
