# Donation Management Application

A Node Http Server for Donation Management Application implemented in Node.js using HTTP for handling CRUD operations on donation records.

## Features

- Retrieve a list of all donations
- Retrieve details of a specific donation by ID
- Create a new donation
- Update an existing donation
- Delete a donation by ID

## Before you start
1. [x] Download the code from Git-Hub https://github.comfgnfdjkgnfjkdgnkfjg
2. [x] Navigate to the project directory and start the server using the following command in the      terminal - $node index.js
3. [x] Install dependencies as described in the package.json [npm install].

## Instructions
1. [x] index.js  – the entry point of the system
2. [x] Router – responsible for handling incoming HTTP requests and routing to the appropriate controller function.
3. [x] Controller – contains the business logic, processes data, and generates responses based on the request.
4. [x] Repository - responsible for interacting with the data source.
5. [x] Data Base - JSON file : 'donations.json'.


## Prerequisites

- Node.js installed on your machine
- `npm` (Node Package Manager) to install dependencies

## Logging
The application utilizes the Winston logging library for logging. Log statements can be found throughout the codebase to provide insights into the application's behavior.


## How to Use

1. ### **Retrieve all donations:**
   * Request: http://localhost:3000/donations
     
3. ### **Retrieve details of a specific donation by ID:**
   * Request for id = 3 : http://localhost:3000/donations/?id=3
   * Note: make sure the id number comes after '/?'.
     
4. ### **Create a new donation:**
   * Request: http://localhost:3000/donations/?id=4&name=Eliya&amount=600&location=modiin
   * Note: make sure that all the parameters comes after '/?'.
   * Note: **make sure you send all the parameters like the following: id, name, amount, location.**
     
5. ### **Update an existing donation:**
   * Request: http://localhost:3000/donations/?id=4&amount=1000
   * Note: only if a donation with this id exists in the system.
     
6. ### **Delete a donation:**
   * Request: http://localhost:3000/donations/?id=4
   * Note: only if a donation with this id exists in the system.
      
> **Postman**
> https://documenter.getpostman.com/view/31981459/2s9YynmjJ7
