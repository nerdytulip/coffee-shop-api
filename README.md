# Coffee Shop API

The Coffee Shop API is a serverless REST API for managing coffee orders. It uses AWS Lambda, API Gateway, and DynamoDB, and is built with Node.js and TypeScript using the Serverless Framework. This project demonstrates best practices in a serverless architecture along with automated testing and CI/CD using GitHub Actions.

---

## Features

- **CRUD Operations:** Create, read, update, and delete coffee orders.
- **Serverless Architecture:** No server management—deploy code directly.
- **DynamoDB Integration:** Data is stored in a DynamoDB table, automatically provisioned.
- **Multi-Stage Deployments:** Separate environments for development and production.
- **Automated CI/CD:** GitHub Actions pipeline for testing and deployment.
- **Local Development:** Use Serverless Offline for local testing.

---

## Architecture

The system is built using a serverless architecture:

- **API Gateway** exposes REST endpoints.
- **AWS Lambda** functions handle business logic.
- **DynamoDB** stores order data.
- **CI/CD Pipeline** (GitHub Actions) automates testing and deployment.

---

## CI/CD Pipeline and setup

1. **GitHub Actions Secrets:**

   ![image](https://github.com/user-attachments/assets/5409f0ea-ba54-460f-bf96-c0f7d60401a5)
   ![image](https://github.com/user-attachments/assets/5a9e3d9b-96cf-4ac3-a884-159a9834c28c)
   ![image](https://github.com/user-attachments/assets/d5a5105f-1df0-4316-9f5a-d4b440869def)

2. **Deploy Dev and Run Full Tests:**

   - Triggered on push to origin master
   - Runs unit tests
   - Deploys the `dev` environment
   - Runs integration tests
     ![image](https://github.com/user-attachments/assets/e3886a2d-0973-4794-8361-b5a4ca4a61ab)
     ![image](https://github.com/user-attachments/assets/7211d410-6951-4cc3-b979-e5e1f7be2ebf)

3. **Deploy Prod:**

   - Runs only if `dev` tests pass
   - Deploys the `prod` environment  
     ![image](https://github.com/user-attachments/assets/e80dd957-d761-4a84-90b2-52c3c688f5c7)

4. **GitHub Actions Workflow Execution**
   - Overview of the workflow run
     ![image](https://github.com/user-attachments/assets/bd141766-e801-4495-9575-031e08bed4b3)

---

## API Testing with Postman

1. **Create Order:**
   ![image](https://github.com/user-attachments/assets/8161d9fe-6139-42e1-acd1-d361435f8455)
   ![image](https://github.com/user-attachments/assets/f53bdd80-de04-4ff2-9536-de8402b01b07)

2. **List Orders:**
   ![image](https://github.com/user-attachments/assets/cc1023c5-d85f-410a-88bd-59f2b4108edd)
   ![image](https://github.com/user-attachments/assets/dc3887c5-c9be-4cb1-89d4-4b6761470b09)

3. **Get Order:**
   ![image](https://github.com/user-attachments/assets/e5db3835-6fc0-4416-b9a4-a4dfcdd1cabe)

4. **Update Order:**
   ![image](https://github.com/user-attachments/assets/b0f5293a-302a-4a23-afac-308841fd4596)

5. **Delete Order:**
   ![image](https://github.com/user-attachments/assets/4b59a4ba-a6af-4d41-855c-8f5ecc21e077)

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nerdytulip/coffee-shop-api.git
   cd coffee-shop-api
   ```
