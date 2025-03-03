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
      console.error("Missing Order ID");
      return createResponse(400, { error: "Order ID is required" });
    }

    if (!data.orderStatus) {
      console.error("Missing orderStatus in request body");
      return createResponse(400, { error: "orderStatus is required" });
    }

    const timestamp = new Date().getTime();

    // Define update expression and attributes
    const updateExpression = "SET #os = :orderStatus, updatedAt = :updatedAt";
    const expressionAttributes = {
      ":orderStatus": data.orderStatus,
      ":updatedAt": timestamp,
    };
    const expressionAttributeNames = {
      "#os": "orderStatus",
    };

    const result = await dynamoDbClient.update(id, updateExpression, {
      ...expressionAttributes,
      ExpressionAttributeNames: expressionAttributeNames,
    });

    console.log("Update Result:", JSON.stringify(result, null, 2));

    return createResponse(200, result.Attributes);
  } catch (error) {
    console.error("Error updating order:", error);
    return createResponse(500, { error: "Could not update order" });
  }
};
