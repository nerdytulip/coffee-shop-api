import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { dynamoDbClient } from "../utils/dynamodb";
import { createResponse } from "../utils/response";

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const result = await dynamoDbClient.scan();
    return createResponse(200, result.Items);
  } catch (error) {
    console.error("Error listing orders:", error);
    return createResponse(500, { error: "Could not list orders" });
  }
};
