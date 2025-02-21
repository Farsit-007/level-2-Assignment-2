## Assignment - 2 (Updated For The Assignment-4)

## Student Id - WEB9-1722

## Project Name - Bike Store (Set - 2)

## [Live Link](https://assignment-2-gray-sigma.vercel.app/)

## 🚀 Project Features :

**• Product Management** </br>
1.Create, read, update, and delete (CRUD) bike products.</br>
2.Filter bikes by name, brand, or category.</br>

**• Order Management** </br>
1.Place orders for available bikes.</br>
2.Inventory is automatically updated based on orders.</br>

**• Revenue Calculation** </br>
1.Get total revenue using MongoDB aggregation.</br>

**• Data Validation** </br>
1.Enforced data integrity with Mongoose schema and Zod Validation.</br>

**• Error Handling**</br>
1.Generic error response structure with meaningful messages.</br>

## 🛠️ Technology Stack

• Backend: Node.js, Express.js</br>
• Language: TypeScript</br>
• Database: MongoDB with Mongoose</br>
• Validation: Mongoose schema & Zod Validation</br>
• Utilities: Dotenv, Cors</br>
• Development Tools: Nodemon, TypeScript</br>

### 🧰 Setup Instructions

```js
git clone <repository-url>
cd level-2-Assignment-2
```

### .env file

```js
PORT = 
DATABASE_URI = 
NODE_ENV = Development

JWT_ACCESS_SECRET = 
JWT_REFRESH_SECRET = 

SP_ENDPOINT=https://sandbox.shurjopayment.com
SP_USERNAME=sp_sandbox
SP_PASSWORD=pyyk97hu&6u6
SP_PREFIX=SP
SP_RETURN_URL=https://sandbox.shurjopayment.com/response
```

### Install NPM

```shell
npm i
```

### Run the Project

```shell
npm run start:dev
```

## Create a Bike

**Endpoint: /api/products**</br>
**Method : POST**</br>
Request Body:

```js
{
  "name": "Xtreme Mountain Bike",
  "brand": "Giant",
  "price": 1200,
  "category": "Mountain",
  "description": "A high-performance bike built for tough terrains.",
  "quantity": 50,
  "inStock": true
}
```

## Get All Bikes

**Endpoint: /api/products**</br>
**Method : GET**</br>
Query: A list of all bikes from the same category, accessed via /api/products?searchTerm=category. searchTerm can be name, brand, or category

## Get a Specific Bike

**Endpoint: /api/products/:productId**</br>
**Method : GET**</br>

## Update a Bike

**Endpoint: /api/products/:productId**</br>
**Method : PUT**</br>
Request Body:
```js
{
  "price": 1300,
  "quantity": 30
}
```

## Delete a Bike

**Endpoint: /api/products/:productId**</br>
**Method : DELETE**</br>

## Order a Bike

**Endpoint: /api/orders**</br>
**Method : POST**</br>
Request Body:
```js
{
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",
  "quantity": 2,
  "totalPrice": 2400
}
```

## Calculate Revenue from Orders (Aggregation)

**Endpoint: /api/orders/revenue**</br>
**Method : GET**</br>
