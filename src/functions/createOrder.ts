import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import { Order } from "../models/order";
import { dynamoDbClient } from "../utils/dynamodb";
import { createResponse } from "../utils/response";

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const data = JSON.parse(event.body || "{}");
    const timestamp = new Date().getTime();

    const order: Order = {
      id: uuidv4(),
      customerName: data.customerName,
      items: data.items,
      orderStatus: "PENDING",
      totalAmount: data.items.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      ),
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await dynamoDbClient.put(order);

    return createResponse(201, order);
  } catch (error) {
    console.error("Error creating order:", error);
    return createResponse(500, { error: "Could not create order" });
  }
};
