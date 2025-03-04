describe("Smoke Tests - Production", () => {
  test("should respond with 200 from listOrders endpoint", async () => {
    const prodApiUrl = process.env.PROD_API_URL;
    if (!prodApiUrl) {
      throw new Error("PROD_API_URL is not set");
    }

    const response = await fetch(`${prodApiUrl}/orders`);
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });
});
