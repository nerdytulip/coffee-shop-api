import { handler as createOrder } from "../../src/functions/createOrder";
import { handler as getOrder } from "../../src/functions/getOrder";

describe("Orders API Integration Tests", () => {
  test("should create an order successfully", async () => {
    const event = {
      body: JSON.stringify({
        customerName: "John Doe",
        items: [{ name: "Latte", quantity: 2, price: 4.5 }],
      }),
    };

    const response = await createOrder(event as any);
    expect(response.statusCode).toBe(201);

    const body = JSON.parse(response.body);
    expect(body.id).toBeDefined();
    expect(body.customerName).toBe("John Doe");
  });

  test("should get an order successfully", async () => {
    // First create an order
    const createEvent = {
      body: JSON.stringify({
        customerName: "Jane Doe",
        items: [{ name: "Cappuccino", quantity: 1, price: 3.5 }],
      }),
    };

    const createResponse = await createOrder(createEvent as any);
    const createdOrder = JSON.parse(createResponse.body);

    // Then try to get it
    const getEvent = {
      pathParameters: {
        id: createdOrder.id,
      },
    };

    const response = await getOrder(getEvent as any);
    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);
    expect(body.id).toBe(createdOrder.id);
    expect(body.customerName).toBe("Jane Doe");
  });
});
