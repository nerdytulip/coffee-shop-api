import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

function getOrdersTable(): string {
  const table = process.env.ORDERS_TABLE;
  if (!table) {
    throw new Error("ORDERS_TABLE environment variable is not set");
  }
  return table;
}

export const dynamoDbClient = {
  get: (id: string) => {
    return dynamoDb
      .get({
        TableName: getOrdersTable(),
        Key: { id },
      })
      .promise();
  },

  put: (item: any) => {
    return dynamoDb
      .put({
        TableName: getOrdersTable(),
        Item: item,
      })
      .promise();
  },

  update: (id: string, updateExpression: string, expressionAttributes: any) => {
    return dynamoDb
      .update({
        TableName: getOrdersTable(),
        Key: { id },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributes,
        ReturnValues: "ALL_NEW",
      })
      .promise();
  },

  delete: (id: string) => {
    return dynamoDb
      .delete({
        TableName: getOrdersTable(),
        Key: { id },
      })
      .promise();
  },

  scan: () => {
    return dynamoDb
      .scan({
        TableName: getOrdersTable(),
      })
      .promise();
  },
};
